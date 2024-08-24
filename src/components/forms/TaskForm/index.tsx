"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SubjectTask } from "@/types/schedules";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Dropdown from "@/components/ui/Dropdown";
import Checkbox from "@/components/ui/Checkbox";
import { FormContainer, FormRow } from "@/components/forms/styles";

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
	const { handleSubmit, register, reset } = useForm<TaskSchema>({
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
		const newTask: SubjectTask = {
			id: props.original?.id ?? data.name,
			...data
		};

		if (!props.original) {
			props.controls.addTask(newTask);
		} else {
			props.controls.editTask(props.original, newTask);
		}

		closeForm();
	}

	function handleDelete() {
		if (props.original) {
			props.controls.removeTask(props.original);
		}

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
				label="Disciplina"
				options={subjectOptions}
				required
				{...register("subjectId", { required: true })}
			/>
			<Input
				type="text"
				label="Nome"
				placeholder="Trabalho"
				{...register("name", { required: true })}
			/>
			<Textarea
				label="Descrição"
				placeholder="Descrição do trabalho"
				{...register("description")}
			/>
			<FormRow>
				<Input
					type="date"
					label="Submissão"
					placeholder="Descrição do trabalho"
					{...register("submission")}
				/>
				<Checkbox
					label="Completo?"
					alignment="vertical"
					{...register("finished")}
				/>
			</FormRow>
			<FormRow>
				<Button type="submit">
					{props.original ? "Salvar" : "Criar"}
				</Button>
				<Button onClick={closeForm}>Cancelar</Button>
				{props.original && (
					<Button onClick={handleDelete}>Deletar</Button>
				)}
			</FormRow>
		</FormContainer>
	);
}
