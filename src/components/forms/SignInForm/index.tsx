"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "@/utils/authActions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Toast from "@/components/ui/Toast";

import { SignInSchema, signInSchema } from "./types";
import { Form, ErrorMessage } from "./styles";

export default function SignInForm() {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const router = useRouter();

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
		setError("");
		
		try {
			const success = await login(data.username, data.password);
			
			if (success) {
				router.push("/dashboard");
			} else {
				setError("Credenciais inválidas. Por favor, tente novamente.");
			}
		} catch (err) {
			setError("Ocorreu um erro ao fazer login. Por favor, tente novamente.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			{error && (
				<Toast
					message={error}
					type="error"
					onClose={() => setError("")}
				/>
			)}
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
		</>
	);
}
