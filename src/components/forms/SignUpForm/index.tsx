"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { register as signUp } from "@/utils/authActions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { signUpSchema, SignUpSchema } from "./types";
import { Form } from "./styles";

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
				placeholder="********"
				{...register("password")}
			/>
			<Input
				label="Confirme a Senha"
				type="password"
				placeholder="********"
				{...register("passwordConfirm")}
			/>
			<Button type="submit" loading={loading}>
				Register
			</Button>
		</Form>
	);
}
