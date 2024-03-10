"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "@/utils/authActions";
import { exitAuth } from "@/utils/redirects";

import { Button, Form, Input } from "./styles";

const signInSchema = z.object({
	username: z.string(),
	password: z.string()
});
type SignInSchema = z.infer<typeof signInSchema>;

export default function SignInForm() {
	const { register, handleSubmit } = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema)
	});

	async function handleSignInAttempt(data: SignInSchema) {
		const success = await login(data.username, data.password);
		if (!success) {
			console.log("LOGIN ERROR");
			return;
		}

		exitAuth();
	}

	return (
		<Form onSubmit={handleSubmit(handleSignInAttempt)}>
			<h1>Sign In</h1>
			<Input
				type="text"
				placeholder="username"
				{...register("username")}
			/>
			<Input
				type="password"
				placeholder="password"
				{...register("password")}
			/>
			<Button type="submit">Login</Button>
		</Form>
	);
}
