import { useForm } from "react-hook-form";

import { ScheduleControlI } from "@/hooks/useSchedule";
import { FormContainer, FormRow } from "@/components/forms/styles";
import { MODAL_TRANSITION_TIME_MS } from "@/components/ui/Modal/styles";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Taskarea";
import Dropdown from "@/components/ui/Dropdown";

import { TaskSchema } from "./types";

interface TaskFormProps {
	controls: ScheduleControlI;
	finally?: () => void;
}

export default function TaskForm(props: TaskFormProps) {
	const { handleSubmit, register, reset } = useForm<TaskSchema>();

	function closeForm() {
		if (props.finally) props.finally();

		// Timeout to reset the form after the transition ends
		new Promise<void>((resolve) =>
			setTimeout(() => {
				resolve();
				reset();
			}, MODAL_TRANSITION_TIME_MS)
		);
	}

	function handleSaveData(data: TaskSchema) {
		props.controls.addTask({
			id: data.name,
			...data
		});

		closeForm();
	}

	const subjectOptions: { [key: string]: string } = {};
	props.controls.getAllSubjects().forEach((subject) => {
		subjectOptions[subject.id] = subject.name;
	});

	return (
		<FormContainer onSubmit={handleSubmit(handleSaveData)}>
			<h1>Tarefa</h1>
			<Dropdown
				label="Disciplina"
				options={subjectOptions}
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
			<Input
				type="date"
				label="Submissão"
				placeholder="Descrição do trabalho"
				{...register("submission")}
			/>
			<FormRow>
				<Button type="submit">Salvar</Button>
				<Button onClick={closeForm}>Cancelar</Button>
			</FormRow>
		</FormContainer>
	);
}
