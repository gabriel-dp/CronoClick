"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { login } from "@/utils/authActions";
import Button from "@/components/ui/Button";

import { Form, Input } from "./styles";

const signInSchema = z.object({
	username: z.string().trim().min(1),
	password: z.string().min(1)
});
type SignInSchema = z.infer<typeof signInSchema>;

export default function SignInForm() {
	const [loading, setLoading] = useState<boolean>(false);

	const { register, handleSubmit } = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema)
	});

	async function handleSignInAttempt(data: SignInSchema) {
		setLoading(true);
		const success = await login(data.username, data.password);
		setLoading(false);

		if (!success) console.log("LOGIN ERROR");
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
			<Button type="submit" loading={loading}>
				Login
			</Button>
		</Form>
	);
}
