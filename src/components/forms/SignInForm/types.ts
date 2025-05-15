import { z } from "zod";

export const signInSchema = z.object({
	username: z.string().trim().min(1),
	password: z.string().min(1)
});

export type SignInSchema = z.infer<typeof signInSchema>;
