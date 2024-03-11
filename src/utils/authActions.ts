"use client";

import { signIn, signOut } from "next-auth/react";

import { redirectSignIn } from "@/utils/redirects";

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

export async function logout() {
	await signOut({
		redirect: false
	});

	redirectSignIn();
}
