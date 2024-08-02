import z from "zod";

import { SubjectTask } from "@/types/schedules";
import { formatDateToString } from "@/utils/timeUtils";

export const taskZodSchema = z.object({
	name: z.string().trim().min(1),
	description: z.string().trim().max(256),
	submission: z.string(),
	subjectId: z.string()
});

export type TaskSchema = z.infer<typeof taskZodSchema>;

export const DEFAULT_TASK: TaskSchema = {
	name: "",
	description: "",
	submission: formatDateToString(new Date()),
	subjectId: ""
};

export function convertToTaskSchema(task: SubjectTask): TaskSchema {
	const { name, description, submission, subjectId } = task;
	return { name, description, submission, subjectId };
}
