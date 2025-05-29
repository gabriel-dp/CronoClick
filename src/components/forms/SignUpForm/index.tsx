"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { register as signUp } from "@/utils/authActions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { signUpSchema, SignUpSchema } from "./types";
import { Form, ErrorMessage } from "./styles";

export default function SignUpForm() {
	const [loading, setLoading] = useState<boolean>(false);
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

		try {
			const success = await signUp(data);

			if (success) {
				toast.success(
					"Cadastro realizado com sucesso! Redirecionando..."
				);
				setTimeout(() => {
					router.push("/sign-in");
				}, 2000);
			} else {
				toast.error(
					"Erro ao realizar cadastro. Por favor, tente novamente."
				);
			}
		} catch (err) {
			toast.error(
				"Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente."
			);
		} finally {
			setLoading(false);
		}
	}

	return (
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
	);
}
