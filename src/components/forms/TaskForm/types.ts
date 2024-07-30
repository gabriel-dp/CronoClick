import z from "zod";

export const taskZodSchema = z.object({
	name: z.string().trim().min(1),
	description: z.string().trim(),
	submission: z.coerce.date()
});

export type TaskSchema = z.infer<typeof taskZodSchema>;
