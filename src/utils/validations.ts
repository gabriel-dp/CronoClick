import { z } from "zod";

import { Schedule, Subject } from "@/types/schedules";

export const timeZodSchema = z.object({
	days: z.number().min(1).max(127),
	start: z
		.number()
		.min(0)
		.max(60 * 24),
	duration: z
		.number()
		.min(1)
		.max(60 * 24)
});

export const subjectZodSchema = z.object({
	name: z.string().trim().min(1),
	teacher: z.string().trim(),
	color: z.string().regex(/^#[A-Fa-f0-9]{6}/),
	times: z.array(timeZodSchema).min(1)
});

export function validatedFieldsSubject(
	body: Subject
): Pick<Subject, "name" | "color" | "teacher" | "times"> {
	const fields = subjectZodSchema.parse(body);
	return fields;
}

const scheduleZodSchema = z.object({
	name: z.string().trim().min(1).max(100)
});

export function validatedFieldsSchedule(
	body: Schedule
): Pick<Schedule, "name"> {
	const fields = scheduleZodSchema.parse(body);
	return fields;
}
