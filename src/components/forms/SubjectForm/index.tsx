"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

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
	const { control, register, handleSubmit, reset, setError, formState: { errors }, watch, setValue } =
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
			reset(convertToSubjectSchema(props.original));
		}
	}, [props.original, props.controls, reset]);

	function closeForm() {
		if (props.finally) props.finally(() => reset(DEFAULT_SUBJECT));
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
		// Validação do nome da disciplina
		if (!data.name.trim()) {
			toast.error("Por favor, insira um nome para a disciplina");
			setError("name", { message: "O nome da disciplina é obrigatório" });
			return;
		}

		// Validação dos dias e horários
		const errorOccurrence = errorOccurrences(data);
		if (errorOccurrence != undefined) {
			toast.error("Por favor, selecione pelo menos um dia para cada ocorrência");
			setError(
				`occurrences.${errorOccurrence}.days`,
				new Error("Selecione pelo menos um dia")
			);
			return;
		}

		// Validação do horário de início
		data.occurrences.forEach((occurrence, index) => {
			if (!occurrence.start) {
				toast.error("Por favor, insira o horário de início para cada ocorrência");
				setError(
					`occurrences.${index}.start`,
					new Error("O horário de início é obrigatório")
				);
				return;
			}
		});

		// Validação da duração
		data.occurrences.forEach((occurrence, index) => {
			if (!occurrence.duration || occurrence.duration <= 0) {
				toast.error("Por favor, insira uma duração válida para cada ocorrência");
				setError(
					`occurrences.${index}.duration`,
					new Error("A duração deve ser maior que zero")
				);
				return;
			}
		});

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
		toast.success("Disciplina adicionada com sucesso ao seu cronograma!");
		closeForm();
	}

	function handleDelete() {
		if (props.original) {
			props.controls.removeSubject(props.original.id);
			toast.success("Disciplina removida com sucesso!");
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
				error={errors.name?.message}
			/>
			<Input
				type="text"
				label="Professor"
				{...register("teacher")}
				error={errors.teacher?.message}
			/>
			<div>
				<label style={{ display: "block", marginBottom: "0.5rem" }}>Cor</label>
				<ColorPicker
					value={watch("color")}
					onChange={(color) => setValue("color", color)}
				/>
				{errors.color?.message && (
					<p style={{ color: "#ff4d4d", fontSize: "0.75rem", margin: "0.25rem 0 0 0" }}>
						{errors.color.message}
					</p>
				)}
			</div>
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
					{errors.occurrences?.[i]?.days && (
						<p style={{ color: "#ff4d4d", fontSize: "0.75rem", margin: "0.25rem 0 0 0" }}>
							{errors.occurrences[i]?.days?.message}
						</p>
					)}
					<FormRow>
						<Input
							type="time"
							label="Início"
							{...register(`occurrences.${i}.start`, {
								required: true
							})}
							error={errors.occurrences?.[i]?.start?.message}
						/>
						<Input
							type="number"
							label="Duração (minutos)"
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
		</FormContainer>
	);
}
