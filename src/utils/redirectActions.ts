"use server";

import { redirect } from "next/navigation";

export async function redirectSignIn() {
	redirect("/sign-in");
}

export async function exitAuth() {
	redirect("/");
}
