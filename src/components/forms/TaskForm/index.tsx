"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
	FaRegTrashCan as TrashIcon,
	FaDownload as DownloadIcon,
	FaPaperclip as ClipIcon
} from "react-icons/fa6";

import { Attachment, SubjectTask } from "@/types/schedules";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import { useModal } from "@/hooks/useModal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Checkbox from "@/components/ui/Checkbox";
import Modal from "@/components/ui/Modal";
import { FormContainer, FormRow } from "@/components/forms/styles";
import ConfirmDeleteForm from "@/components/forms/ConfirmDeleteForm";

import {
	convertToTaskSchema,
	DEFAULT_TASK,
	TaskSchema,
	taskZodSchema
} from "./types";
import { AttachmentsList } from "./styles";
import { apiDownload } from "@/hooks/useApiRequest";

interface TaskFormProps {
	controls: ScheduleControlI;
	finally?: (fun?: () => void) => void;
	original?: SubjectTask;
}

export default function TaskForm(props: TaskFormProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [attachmentToDelete, setAttachmentToDelete] =
		useState<Attachment | null>(null);
	const confirmDeleteAttachmentModal = useModal();
	const confirmDeleteTaskModal = useModal();
	const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(
		null
	);

	const {
		handleSubmit,
		register,
		reset,
		setError,
		formState: { errors },
		getValues
	} = useForm<TaskSchema>({
		defaultValues: DEFAULT_TASK,
		resolver: zodResolver(taskZodSchema)
	});

	// Set initial values if exists
	useEffect(() => {
		if (props.original) {
			reset(convertToTaskSchema(props.original));
		}
	}, [props.original, props.controls, reset]);

	function closeForm() {
		if (props.finally) props.finally(() => reset(DEFAULT_TASK));
	}

	function handleSaveData(data: TaskSchema) {
		// Validação dos campos obrigatórios
		if (!data.subjectId) {
			toast.error("Por favor, selecione uma disciplina para a tarefa");
			setError("subjectId", { message: "A disciplina é obrigatória" });
			return;
		}
		if (!data.name) {
			toast.error("Por favor, insira um nome para a tarefa");
			setError("name", { message: "O nome da tarefa é obrigatório" });
			return;
		}
		if (!data.submission) {
			toast.error(
				"Por favor, insira uma data de submissão para a tarefa"
			);
			setError("submission", {
				message: "A data de submissão é obrigatória"
			});
			return;
		}

		const newTask: SubjectTask = {
			id: props.original?.id ?? data.name,
			...data,
			notes: props.original?.notes ?? [],
			attachments: props.original?.attachments ?? []
		};

		if (!props.original) {
			props.controls.addTask(newTask);
			toast.success("Tarefa adicionada com sucesso ao seu cronograma!");
		} else {
			props.controls.editTask(props.original, newTask);
			toast.success("Tarefa editada com sucesso!");
		}

		closeForm();
	}

	function handleDelete() {
		if (props.original) {
			props.controls.removeTask(props.original);
			toast.success("Tarefa removida com sucesso!");
		}
		closeForm();
	}

	async function handleDeleteAttachment(attachment: Attachment) {
		try {
			props.controls.removeAttachment({
				...attachment,
				taskId: props.original!.id,
				subjectId: props.original!.subjectId
			});
			toast.success("Anexo deletado com sucesso!");
		} catch (error) {
			toast.error("Erro ao deletar anexo");
			console.error("Erro ao deletar anexo:", error);
		}
	}

	async function handleAddAttachment(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 3 * 1024 * 1024) {
			setUploadError("O anexo deve ter no máximo 3MB");
			return;
		}
		setIsUploading(true);
		setUploadError(null);

		const formData = new FormData();
		formData.set("file", file);
		try {
			props.controls.addAttachment(
				{
					id: file.name,
					filename: file.name,
					taskId: props.original!.id,
					subjectId: getValues("subjectId")
				},
				formData
			);
			toast.success("Anexo enviado com sucesso!");
		} catch (err) {
			setUploadError("Erro ao processar anexo");
			toast.error("Erro ao enviar anexo");
			console.log(err);
		} finally {
			setIsUploading(false);
		}
	}

	async function handleAttachmentDownload(attachment: Attachment) {
		try {
			await apiDownload(`attachments/${attachment.id}`);
			toast.success("Download iniciado!");
		} catch (error) {
			toast.error("Erro ao baixar anexo");
			console.error("Erro ao baixar anexo:", error);
		}
	}

	const subjectOptions = props.controls
		.getAllSubjects()
		.sort((a, b) => a.name.localeCompare(b.name))
		.reduce<{ [key: string]: string }>((acc, cur) => {
			acc[cur.id] = cur.name;
			return acc;
		}, {});

	return (
		<FormContainer onSubmit={handleSubmit(handleSaveData)}>
			<h1>Tarefa</h1>
			<Dropdown
				label="Disciplina*"
				options={subjectOptions}
				required
				{...register("subjectId", { required: true })}
			/>
			<Input
				type="text"
				label="Nome*"
				placeholder="Trabalho"
				{...register("name", { required: true })}
				error={errors.name?.message}
			/>
			<FormRow>
				<Input
					type="date"
					label="Submissão*"
					placeholder="Descrição do trabalho"
					{...register("submission")}
					error={errors.submission?.message}
				/>
				<Checkbox
					label="Completo?"
					alignment="vertical"
					{...register("finished")}
				/>
			</FormRow>
			<hr />
			<FormRow>
				<Button type="submit">
					{props.original ? "Salvar" : "Criar"}
				</Button>
				<Button onClick={closeForm}>Cancelar</Button>
				{props.original && (
					<Button onClick={confirmDeleteTaskModal.open}>
						Deletar
					</Button>
				)}
			</FormRow>
			<hr />
			{props.original && (
				<div id="attachments-section">
					<h2>Anexos</h2>
					{props.original.attachments.length === 0 && (
						<p
							style={{
								marginTop: "0.75rem",
								textAlign: "center"
							}}
						>
							Nenhum anexo
						</p>
					)}
					<AttachmentsList>
						{props.original.attachments.map((attachment) => (
							<li key={attachment.id}>
								<div className="filename">
									<p className="filename">
										{attachment.filename}
									</p>
								</div>
								<div>
									<Button
										title="Baixar anexo"
										onClick={() =>
											handleAttachmentDownload(attachment)
										}
									>
										<DownloadIcon />
									</Button>
									<Button
										style={{ background: "#ff4444" }}
										title="Deletar anexo"
										onClick={() => {
											setAttachmentToDelete(attachment);
											confirmDeleteAttachmentModal.open();
										}}
									>
										<TrashIcon />
									</Button>
								</div>
							</li>
						))}
					</AttachmentsList>
					{props.original.attachments.length < 3 ? (
						<div
							style={{
								marginTop: 8,
								display: "flex",
								justifyContent: "center"
							}}
						>
							<input
								ref={setFileInputRef}
								type="file"
								accept="*"
								onChange={handleAddAttachment}
								disabled={isUploading}
								style={{ display: "none" }}
							/>
							<Button
								onClick={() => fileInputRef?.click()}
								disabled={isUploading}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: "0.5rem"
								}}
							>
								<ClipIcon />
								{isUploading
									? "Enviando..."
									: "Adicionar anexo"}
							</Button>
							{uploadError && (
								<span
									style={{
										color: "red",
										display: "block",
										marginTop: "0.5rem"
									}}
								>
									{uploadError}
								</span>
							)}
						</div>
					) : (
						<p>Limite de 3 anexos atingido.</p>
					)}
				</div>
			)}
			<Modal {...confirmDeleteAttachmentModal}>
				<ConfirmDeleteForm
					onCancel={confirmDeleteAttachmentModal.close}
					onConfirm={() => {
						confirmDeleteAttachmentModal.close();
						handleDeleteAttachment(attachmentToDelete!);
					}}
					title="Deletar anexo?"
					description={
						<>
							Tem certeza que deseja deletar este anexo?
							<br />
							Esta ação não poderá ser desfeita.
						</>
					}
				/>
			</Modal>
			<Modal {...confirmDeleteTaskModal}>
				<ConfirmDeleteForm
					onCancel={confirmDeleteTaskModal.close}
					onConfirm={() => {
						confirmDeleteTaskModal.close();
						handleDelete();
					}}
					title="Deletar tarefa?"
					description={
						<>
							Tem certeza que deseja deletar esta tarefa?
							<br />
							Esta ação não poderá ser desfeita.
						</>
					}
				/>
			</Modal>
		</FormContainer>
	);
}
