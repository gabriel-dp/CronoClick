import z from "zod";

import { SubjectTask } from "@/types/schedules";
import { formatDateToString } from "@/utils/timeUtils";

export const taskZodSchema = z.object({
	name: z.string().trim().min(1),
	submission: z.string(),
	finished: z.boolean(),
	subjectId: z.string()
});

export type TaskSchema = z.infer<typeof taskZodSchema>;

export const DEFAULT_TASK: TaskSchema = {
	name: "",
	submission: formatDateToString(new Date()),
	finished: false,
	subjectId: ""
};

export function convertToTaskSchema(task: SubjectTask): TaskSchema {
	const { name, submission, finished, subjectId } = task;
	return { name, submission, finished, subjectId };
}
