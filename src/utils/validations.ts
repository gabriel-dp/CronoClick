import { z, ZodObject, ZodRawShape } from "zod";

export const userSchema = z.object({
	username: z.string().min(1, "Username is required").max(100),
	email: z.string().min(1, "Email is required").email("Invalid email"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must have at least 8 characters ")
});
export type userType = z.TypeOf<typeof userSchema>;

export const scheduleSchema = z.object({
	name: z.string().trim().min(1).max(100)
});
export type scheduleType = z.TypeOf<typeof scheduleSchema>;

export const timeSchema = z.object({
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
export type timeType = z.TypeOf<typeof timeSchema>;

export const subjectSchema = z.object({
	name: z.string().trim().min(1),
	teacher: z.string().trim(),
	color: z.string().regex(/^#[A-Fa-f0-9]{6}/),
	times: z.array(timeSchema).min(1)
});
export type subjectType = z.TypeOf<typeof subjectSchema>;

export const taskSchema = z.object({
	name: z.string().trim().min(1),
	submission: z
		.string()
		.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/),
	finished: z.boolean()
});
export type taskType = z.TypeOf<typeof taskSchema>;

export const noteSchema = z.object({
	description: z.string().min(0).max(256)
});
export type noteType = z.TypeOf<typeof noteSchema>;

export const attachmentSchema = z.object({
	filename: z.string().min(1),
	contentType: z.string().min(1),
	base64Data: z.string().min(1)
});

export function validateFields<F extends ZodRawShape>(
	body: unknown,
	schema: ZodObject<F>
) {
	const fields: z.TypeOf<typeof schema> = schema.parse(body);
	return fields;
}
