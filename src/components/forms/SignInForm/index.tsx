"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button, Form, Input } from "./styles";

const signInSchema = z.object({
	username: z.string(),
	password: z.string()
});
type SignInSchema = z.infer<typeof signInSchema>;

export default function SignInForm() {
	const router = useRouter();

	const { register, handleSubmit } = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema)
	});

	const handleSignInAttempt = async (data: SignInSchema) => {
		const result = await signIn("credentials", {
			username: data.username,
			password: data.password,
			redirect: false
		});

		console.log(result);

		if (result?.error) {
			//console.log(result.error);
			return;
		}

		router.replace("/");
	};

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
