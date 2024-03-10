"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Button() {
	const router = useRouter();

	async function logout() {
		await signOut({
			redirect: false
		});

		router.replace("/sign-in");
	}

	return <button onClick={logout}>logout</button>;
}
