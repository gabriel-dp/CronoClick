import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { User } from "@prisma/client";
import z from "zod";

import prisma from "@/lib/prisma";

const userValidation = z.object({
	username: z.string().min(1, "Username is required").max(100),
	email: z.string().min(1, "Email is required").email("Invalid email"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must have at least 8 characters ")
});

export const validatedFields = (body: User) => {
	const fields = userValidation.parse(body);
	return fields;
};

export const dataConflict = async (
	id: string | null,
	username: string,
	email: string
) => {
	// check if username already exists
	const existingUserByUsername = await prisma.user.findUnique({
		where: { username }
	});
	if (existingUserByUsername && existingUserByUsername?.id != id) {
		return NextResponse.json(
			{
				user: null,
				message: "There is already a user with this username"
			},
			{ status: 409 }
		);
	}

	// check if email already exists
	const existingUserByEmail = await prisma.user.findUnique({
		where: { email }
	});
	if (existingUserByEmail && existingUserByEmail?.id != id) {
		return NextResponse.json(
			{
				user: null,
				message: "There is already an user with this email"
			},
			{ status: 409 }
		);
	}
};

export const encrypt = async (value: string) => {
	const encryptedValue = await hash(value, 10);
	return encryptedValue;
};

export const removePassword = (user: User | null) => {
	if (!user) return null;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password: _, ...userWithoutPassword } = user;
	return userWithoutPassword;
};
