"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { login } from "@/utils/authActions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { SignInSchema, signInSchema } from "./types";
import { Form, ErrorMessage } from "./styles";

export default function SignInForm() {
	const [loading, setLoading] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		mode: "onChange"
	});

	async function handleSignInAttempt(data: SignInSchema) {
		setLoading(true);

		try {
			const success = await login(data.username, data.password);

			if (!success) {
				toast.error("Ocorreu um erro ao fazer login");
			}
		} catch (err) {
			toast.error(
				"Ocorreu um erro ao fazer login. Por favor, tente novamente."
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form onSubmit={handleSubmit(handleSignInAttempt)}>
			<h1>Entrar</h1>
			<Input
				label="Usuário"
				type="text"
				placeholder="Digite seu usuário"
				{...register("username")}
			/>
			{errors.username && (
				<ErrorMessage>{errors.username.message}</ErrorMessage>
			)}
			<Input
				label="Senha"
				type="password"
				placeholder="Digite sua senha"
				{...register("password")}
			/>
			{errors.password && (
				<ErrorMessage>{errors.password.message}</ErrorMessage>
			)}
			<Button type="submit" loading={loading} disabled={!isValid}>
				Entrar
			</Button>
			<hr />
			<p>
				Não possui conta? <Link href="/sign-up">Cadastre-se</Link>
			</p>
		</Form>
	);
}
