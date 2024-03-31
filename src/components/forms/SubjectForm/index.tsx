"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Id } from "@/types/schedules";
import { ScheduleControlI } from "@/hooks/useSchedule";
import { encodeDays } from "@/utils/daysUtils";
import { formatTimeToMinutes } from "@/utils/timeUtils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import { MODAL_TRANSITION_TIME_MS } from "@/components/ui/Modal/styles";

import { FormContainer, FormGroup, FormHead, FormRow } from "./styles";

import {
	DEFAULT_SUBJECT,
	OccurrenceSchema,
	SubjectSchema,
	convertToSubjectSchema,
	subjectZodSchema
} from "./types";
import { useEffect } from "react";

const DAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

interface SubjectFormProps {
	controls: ScheduleControlI;
	finally?: () => void;
	original?: Id;
	transition?: number;
}

export default function SubjectForm(props: SubjectFormProps) {
	const { control, register, handleSubmit, reset, setError } =
		useForm<SubjectSchema>({
			defaultValues: DEFAULT_SUBJECT,
			resolver: zodResolver(subjectZodSchema)
		});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "occurrences"
	});

	// Set initial values if exists
	useEffect(() => {
		if (props.original) {
			const subject = props.controls.getSubject(props.original);
			if (!subject) return;
			reset(convertToSubjectSchema(subject));
		}
	}, [props.original, props.controls, reset]);

	function closeForm() {
		if (props.finally) props.finally();

		// Timeout to reset the form after the transition ends
		new Promise<void>((resolve) =>
			setTimeout(() => {
				resolve();
				reset(DEFAULT_SUBJECT);
			}, MODAL_TRANSITION_TIME_MS)
		);
	}

	function errorOccurrences(data: SubjectSchema): number | undefined {
		let index;

		data.occurrences.every((occurrence, i) => {
			if (!occurrence.days.some((day) => day == true)) {
				index = i;
				return false;
			}
			return true;
		});

		return index;
	}

	function handleSaveData(data: SubjectSchema) {
		const errorOccurrence = errorOccurrences(data);
		if (errorOccurrence != undefined) {
			setError(
				`occurrences.${errorOccurrence}.days`,
				new Error("Select at least one day")
			);
			return;
		}

		const action = !props.original
			? props.controls.addSubject
			: props.controls.editSubject;

		action({
			id: props.original ?? data.name,
			color: data.color,
			name: data.name,
			teacher: data.teacher,
			times: data.occurrences.map((occurrence) => ({
				days: encodeDays(occurrence.days),
				start: formatTimeToMinutes(occurrence.start),
				duration: occurrence.duration
			})),
			tasks: []
		});

		closeForm();
	}

	function handleDelete() {
		if (props.original) {
			props.controls.removeSubject(props.original);
		}

		closeForm();
	}

	return (
		<FormContainer onSubmit={handleSubmit(handleSaveData)}>
			<h1>Disciplina</h1>
			<Input
				type="text"
				label="Nome"
				placeholder="Cálculo I"
				{...register("name", { required: true })}
			/>
			<Input
				type="text"
				label="Professor"
				placeholder="Fábio"
				{...register("teacher")}
			/>
			<Input
				type="color"
				label="Cor"
				placeholder="! Seletor de cor"
				{...register("color")}
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
								{...register(`occurrences.${i}.days.${j}`)}
							/>
						))}
					</FormRow>
					<FormRow>
						<Input
							type="text"
							label="Início"
							placeholder="HH:MM"
							{...register(`occurrences.${i}.start`, {
								required: true
							})}
						/>
						<Input
							type="number"
							label="Duração (minutos)"
							placeholder="0"
							{...register(`occurrences.${i}.duration`, {
								required: true
							})}
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
		</FormContainer>
	);
}
