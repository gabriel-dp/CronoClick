"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { register as signUp } from "@/utils/authActions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Toast from "@/components/ui/Toast";

import { signUpSchema, SignUpSchema } from "./types";
import { Form, ErrorMessage } from "./styles";

export default function SignUpForm() {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		mode: "onChange"
	});

	async function handleSignUpAttempt(data: SignUpSchema) {
		setLoading(true);
		setError("");
		setSuccess("");
		
		try {
			const success = await signUp(data);
			
			if (success) {
				setSuccess("Cadastro realizado com sucesso! Redirecionando...");
				setTimeout(() => {
					router.push("/sign-in");
				}, 2000);
			} else {
				setError("Erro ao realizar cadastro. Por favor, tente novamente.");
			}
		} catch (err) {
			setError("Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.");
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
			{success && (
				<Toast
					message={success}
					type="success"
					onClose={() => setSuccess("")}
				/>
			)}
			<Form onSubmit={handleSubmit(handleSignUpAttempt)}>
				<h1>Cadastrar</h1>
				<Input
					label="Usuário"
					type="text"
					placeholder="Digite seu usuário"
					readOnly
					onFocus={(event) =>
						event.currentTarget.removeAttribute("readonly")
					}
					{...register("username")}
				/>
				{errors.username && (
					<ErrorMessage>{errors.username.message}</ErrorMessage>
				)}
				<Input
					label="Email"
					type="email"
					placeholder="Digite seu email"
					{...register("email")}
				/>
				{errors.email && (
					<ErrorMessage>{errors.email.message}</ErrorMessage>
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
				<Input
					label="Confirme a Senha"
					type="password"
					placeholder="Confirme sua senha"
					{...register("passwordConfirm")}
				/>
				{errors.passwordConfirm && (
					<ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>
				)}
				<Button type="submit" loading={loading} disabled={!isValid}>
					Cadastrar
				</Button>
				<hr />
				<p>
					Já possui conta? <Link href="/sign-in">Faça login</Link>
				</p>
			</Form>
		</>
	);
}
