import { z } from "zod";

export const signInSchema = z.object({
	username: z.string().trim().min(1, "O usuário é obrigatório"),
	password: z.string().min(1, "A senha é obrigatória")
});

export type SignInSchema = z.infer<typeof signInSchema>;
