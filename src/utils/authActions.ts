"use client";

import { signIn, signOut } from "next-auth/react";

import { apiRequest } from "@/hooks/useApiRequest";
import { Session } from "next-auth";

export async function login(
	username: string,
	password: string
): Promise<boolean> {
	const result = await signIn("credentials", {
		username,
		password,
		redirect: false
	});

	return !!result && result?.ok;
}

export async function logout(): Promise<void> {
	await signOut({ redirect: true, callbackUrl: "/" });
}

export async function register(data: {
	email: string;
	username: string;
	password: string;
}): Promise<boolean> {
	let success = false;
	await apiRequest<Session, Session>("users", "POST", data, {
		async actionSuccess() {
			success = await login(data.username, data.password);
		}
	});
	return success;
}
