import z from "zod";

export const taskZodSchema = z.object({
	name: z.string().trim().min(1),
	description: z.string().trim().max(256),
	submission: z.coerce.date().transform((date) => date.toString()),
	subjectId: z.string()
});

export type TaskSchema = z.infer<typeof taskZodSchema>;
