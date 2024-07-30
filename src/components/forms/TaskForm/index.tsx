import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import { MODAL_TRANSITION_TIME_MS } from "@/components/ui/Modal/styles";
import { FormContainer, FormRow } from "@/components/forms/styles";
import Button from "@/components/ui/Button";

import { TaskSchema } from "./types";

interface TaskFormProps {
	finally?: () => void;
}

export default function TaskForm(props: TaskFormProps) {
	const { handleSubmit, register, reset } = useForm<TaskSchema>();

	function handleSaveData(data: TaskSchema) {
		if (props.finally) props.finally();
		console.log(data);
	}

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

	return (
		<FormContainer onSubmit={handleSubmit(handleSaveData)}>
			<h1>Tarefa</h1>
			<Input
				type="text"
				label="Nome"
				placeholder="Trabalho"
				{...register("name", { required: true })}
			></Input>
			<Input
				type="text"
				label="Descrição"
				placeholder="Descrição do trabalho"
				{...register("description")}
			></Input>
			<Input
				type="date"
				label="Submissão"
				placeholder="Descrição do trabalho"
				{...register("submission")}
			></Input>
			<FormRow>
				<Button type="submit">Salvar</Button>
				<Button onClick={closeForm}>Cancelar</Button>
			</FormRow>
		</FormContainer>
	);
}
