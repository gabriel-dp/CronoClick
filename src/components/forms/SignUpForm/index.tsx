"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { register as signUp } from "@/utils/authActions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { Form } from "./styles";

const signUpSchema = z.object({
	username: z.string().trim().min(1),
	password: z.string().regex(/^[\S]{8,32}$/),
	email: z.string().email()
});
type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
	const [loading, setLoading] = useState<boolean>(false);

	const { register, handleSubmit } = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema)
	});

	async function handleSignUpAttempt(data: SignUpSchema) {
		setLoading(true);
		const success = await signUp(data);
		setLoading(false);

		if (!success) console.log("REGISTER ERROR");
	}

	return (
		<Form onSubmit={handleSubmit(handleSignUpAttempt)}>
			<h1>Sign Up</h1>
			<Input
				label="Usuário"
				type="text"
				placeholder="username"
				readOnly
				onFocus={(event) =>
					event.currentTarget.removeAttribute("readonly")
				}
				{...register("username")}
			/>
			<Input
				label="Email"
				type="email"
				placeholder="example@mail.com"
				{...register("email")}
			/>
			<Input
				label="Senha"
				type="password"
				placeholder="password"
				{...register("password")}
			/>
			<Button type="submit" loading={loading}>
				Register
			</Button>
		</Form>
	);
}
