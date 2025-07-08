"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { Attachment, SubjectTask } from "@/types/schedules";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Checkbox from "@/components/ui/Checkbox";
import { FormContainer, FormRow } from "@/components/forms/styles";
import ConfirmDeleteModal from "@/components/ui/Modal/ConfirmDeleteModal";

import {
	convertToTaskSchema,
	DEFAULT_TASK,
	TaskSchema,
	taskZodSchema
} from "./types";
import { apiRequest } from "@/hooks/useApiRequest";

interface TaskFormProps {
	controls: ScheduleControlI;
	finally?: (fun?: () => void) => void;
	original?: SubjectTask;
}

export default function TaskForm(props: TaskFormProps) {
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

	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadError, setUploadError] = useState<string | null>(null);

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
		setDeleteModalOpen(true);
	}

	function confirmDelete() {
		if (props.original) {
			props.controls.removeTask(props.original);
			toast.success("Tarefa removida com sucesso!");
		}
		setDeleteModalOpen(false);
		closeForm();
	}

	async function handleDeleteAttachment(attachment: Attachment) {
		props.controls.removeAttachment({
			...attachment,
			taskId: props.original!.id,
			subjectId: props.original!.subjectId
		});
		// if (res.ok) {
		// 	toast.success("Anexo deletado com sucesso!");
		// } else {
		// 	toast.error("Erro ao deletar anexo");
		// }
	}

	async function handleAddAttachment(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		console.log(file);
		if (!file) return;
		if (file.size > 3 * 1024 * 1024) {
			setUploadError("O anexo deve ter no máximo 3MB");
			return;
		}
		setIsUploading(true);
		setUploadError(null);

		const formData = new FormData();
		formData.append("file", file);
		try {
			props.controls.addAttachment({
				id: file.name,
				file: formData,
				taskId: props.original!.id,
				subjectId: getValues("subjectId")
			});
			// if (res.ok) {
			// 	const data = await res.json();
			// 	setAttachments((prev) => [...prev, data.data]);
			// 	toast.success("Anexo adicionado!");
			// } else {
			// 	setUploadError("Erro ao enviar anexo");
			// }
		} catch (err) {
			setUploadError("Erro ao processar anexo");
		} finally {
			setIsUploading(false);
		}
	}

	async function handleAttachmentDownload(attachment: Attachment) {
		await apiRequest(`attachmets/${attachment.id}`, "GET", {}, {});
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
					<Button onClick={handleDelete}>Deletar</Button>
				)}
			</FormRow>
			<hr />
			{props.original && (
				<div id="attachments-section">
					<h2>Anexos</h2>
					{props.original.attachments.length === 0 && (
						<p>Nenhum anexo.</p>
					)}
					<ul style={{ listStyle: "none", padding: 0 }}>
						{props.original.attachments.map((attachment) => (
							<li
								key={attachment.id}
								style={{
									display: "flex",
									alignItems: "center",
									marginBottom: 8
								}}
							>
								<button
									onClick={() =>
										handleAttachmentDownload(attachment)
									}
								>
									{attachment.file.get("name")?.toString()}
								</button>
								<Button
									style={{ marginLeft: 8 }}
									onClick={() =>
										handleDeleteAttachment(attachment)
									}
								>
									Deletar
								</Button>
							</li>
						))}
					</ul>
					{props.original.attachments.length < 3 ? (
						<div style={{ marginTop: 8 }}>
							<input
								type="file"
								accept="*"
								onChange={handleAddAttachment}
								disabled={isUploading}
							/>
							{isUploading && <span>Enviando...</span>}
							{uploadError && (
								<span style={{ color: "red" }}>
									{uploadError}
								</span>
							)}
						</div>
					) : (
						<p>Limite de 3 anexos atingido.</p>
					)}
				</div>
			)}
			<ConfirmDeleteModal
				isOpen={deleteModalOpen}
				onCancel={() => setDeleteModalOpen(false)}
				onConfirm={confirmDelete}
				title="Deletar tarefa?"
				description={
					<>
						Tem certeza que deseja deletar esta tarefa?
						<br />
						Esta ação não poderá ser desfeita.
					</>
				}
			/>
		</FormContainer>
	);
}
