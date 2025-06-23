"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import React from "react";

import { Subject } from "@/types/schedules";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import { encodeDays } from "@/utils/daysUtils";
import { formatTimeToMinutes } from "@/utils/timeUtils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import ColorPicker from "@/components/ui/ColorPicker";
import {
	FormContainer,
	FormGroup,
	FormHead,
	FormRow
} from "@/components/forms/styles";
import ConfirmDeleteModal from "@/components/ui/Modal/ConfirmDeleteModal";

import {
	DEFAULT_SUBJECT,
	OccurrenceSchema,
	SubjectSchema,
	convertToSubjectSchema,
	subjectZodSchema
} from "./types";

const DAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

interface SubjectFormProps {
	controls: ScheduleControlI;
	finally?: (fun?: () => void) => void;
	original?: Subject;
}

export default function SubjectForm(props: SubjectFormProps) {
	const {
		control,
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
		watch,
		setValue
	} = useForm<SubjectSchema>({
		defaultValues: DEFAULT_SUBJECT,
		resolver: zodResolver(subjectZodSchema)
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "occurrences"
	});

	const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

	// Set initial values if exists
	useEffect(() => {
		if (props.original) {
			reset(convertToSubjectSchema(props.original));
		}
	}, [props.original, props.controls, reset]);

	function closeForm() {
		if (props.finally) props.finally(() => reset(DEFAULT_SUBJECT));
	}

	function handleSaveData(data: SubjectSchema) {
		// Validação do nome da disciplina
		if (!data.name.trim()) {
			toast.error("Por favor, insira um nome para a disciplina");
			setError("name", { message: "O nome da disciplina é obrigatório" });
			return;
		}

		// Validação dos dias e horários
		const errorOccurrence = !data.occurrences.every((occurrence) =>
			occurrence.days.some((day) => day === true)
		);
		if (errorOccurrence) {
			toast.error(
				"Por favor, selecione ao menos um dia para cada ocorrência"
			);
			return;
		}

		const action = !props.original
			? props.controls.addSubject
			: props.controls.editSubject;

		action({
			id: props.original?.id ?? data.name,
			...data,
			times: data.occurrences.map((occurrence) => ({
				days: encodeDays(occurrence.days),
				start: formatTimeToMinutes(occurrence.start),
				duration: occurrence.duration
			})),
			tasks: props.original?.tasks ?? []
		});

		// Mensagem de sucesso
		toast.success(
			!props.original
				? "Disciplina adicionada com sucesso ao seu cronograma!"
				: "Disciplina editada com sucesso!"
		);
		closeForm();
	}

	function handleDelete() {
		setDeleteModalOpen(true);
	}

	function confirmDelete() {
		if (props.original) {
			props.controls.removeSubject(props.original.id);
			toast.success("Disciplina removida com sucesso!");
		}
		setDeleteModalOpen(false);
		closeForm();
	}

	return (
		<FormContainer onSubmit={handleSubmit(handleSaveData)}>
			<h1>Disciplina</h1>
			<Input
				type="text"
				label="Nome*"
				placeholder="Cálculo I"
				{...register("name", { required: true })}
				error={errors.name?.message}
			/>
			<Input
				type="text"
				label="Professor"
				placeholder="Fulano"
				{...register("teacher")}
				error={errors.teacher?.message}
			/>
			<ColorPicker
				label="Cor"
				value={watch("color")}
				onChange={(color) => setValue("color", color)}
			/>
			<hr />
			{fields.map((field, i) => (
				<FormGroup key={field.id}>
					<FormHead>
						<h2>Ocorrência {`(${i + 1})`}</h2>
						{fields.length > 1 && (
							<Button onClick={() => remove(i)}>X</Button>
						)}
					</FormHead>
					<FormRow>
						{DAYS.map((day, j) => (
							<Checkbox
								key={day}
								label={day}
								alignment="vertical"
								small
								{...register(`occurrences.${i}.days.${j}`)}
							/>
						))}
					</FormRow>
					<FormRow>
						<Input
							type="time"
							label="Início*"
							{...register(`occurrences.${i}.start`, {
								required: true
							})}
							error={errors.occurrences?.[i]?.start?.message}
						/>
						<Input
							type="number"
							label="Duração (minutos)*"
							placeholder="0"
							{...register(`occurrences.${i}.duration`, {
								required: true
							})}
							error={errors.occurrences?.[i]?.duration?.message}
						/>
					</FormRow>
				</FormGroup>
			))}
			<Button onClick={() => append({} as OccurrenceSchema)}>
				Adicionar ocorrência
			</Button>
			<hr />
			<FormRow>
				<Button type="submit">
					{!props.original ? "Criar" : "Salvar"}
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
				title="Deletar disciplina?"
				description="Tem certeza que deseja deletar esta disciplina? Esta ação não poderá ser desfeita."
			/>
		</FormContainer>
	);
}
