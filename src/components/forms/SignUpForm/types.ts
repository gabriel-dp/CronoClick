import z from "zod";

export const signUpSchema = z
	.object({
		username: z.string().trim().min(1),
		password: z.string().regex(/^[\S]{8,32}$/),
		passwordConfirm: z.string(),
		email: z.string().email()
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ["passwordConfirm"]
	});

export type SignUpSchema = z.infer<typeof signUpSchema>;
