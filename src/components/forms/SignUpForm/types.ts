import z from "zod";

export const signUpSchema = z
	.object({
		username: z.string().trim().min(1, "O usuário é obrigatório"),
		password: z
			.string()
			.regex(/^[\S]{8,32}$/, "A senha deve ter entre 8 e 32 caracteres"),
		passwordConfirm: z
			.string()
			.min(1, "A confirmação de senha é obrigatória"),
		email: z
			.string()
			.email("Email inválido")
			.min(1, "O email é obrigatório")
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "As senhas não coincidem",
		path: ["passwordConfirm"]
	});

export type SignUpSchema = z.infer<typeof signUpSchema>;
