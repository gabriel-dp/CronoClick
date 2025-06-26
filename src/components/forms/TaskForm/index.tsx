"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { SubjectTask } from "@/types/schedules";
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
		formState: { errors }
	} = useForm<TaskSchema>({
		defaultValues: DEFAULT_TASK,
		resolver: zodResolver(taskZodSchema)
	});

	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
			notes: props.original?.notes ?? []
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
