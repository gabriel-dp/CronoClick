import z from "zod";

import { Subject } from "@/types/schedules";
import { decodeValue } from "@/utils/daysUtils";
import { formatMinutesToTime } from "@/utils/timeUtils";

export const occurrenceZodSchema = z.object({
	days: z.array(z.boolean()),
	start: z.coerce.string().regex(/^[0-9]{2}:[0-9]{2}/),
	duration: z.coerce.number().min(1)
});

export type OccurrenceSchema = z.infer<typeof occurrenceZodSchema>;

export const subjectZodSchema = z.object({
	name: z.string().trim().min(1),
	teacher: z.string().trim(),
	color: z.string().regex(/^#[A-Fa-f0-9]{6}/),
	occurrences: z.array(occurrenceZodSchema)
});

export type SubjectSchema = z.infer<typeof subjectZodSchema>;

export const DEFAULT_SUBJECT: SubjectSchema = {
	name: "",
	color: "#54afff",
	teacher: "",
	occurrences: [{} as OccurrenceSchema]
};

export function convertToSubjectSchema(subject: Subject): SubjectSchema {
	const { name, teacher, color, times } = subject;
	const occurrences: OccurrenceSchema[] = times.map((time) => ({
		days: decodeValue(time.days),
		start: formatMinutesToTime(time.start, "24-hour"),
		duration: time.duration
	}));

	return { name, teacher, color, occurrences };
}
