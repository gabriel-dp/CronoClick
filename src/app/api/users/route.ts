import { NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "@/lib/prisma";
import {
	dataConflict,
	encrypt,
	removePassword,
	validatedFields
} from "@/utils/userUtils";

export async function GET() {
	try {
		const users = await prisma.user.findMany();

		const usersWithoutPassword = users.map((user) => removePassword(user));
		return NextResponse.json(
			{ users: usersWithoutPassword },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const { username, password, email } = validatedFields(
			await request.json()
		);

		// check if data conflicts
		const conflict = await dataConflict(null, username, email);
		if (conflict) return conflict;

		const user = await prisma.user.create({
			data: {
				username,
				password: await encrypt(password),
				email
			}
		});

		return NextResponse.json(
			{ user: removePassword(user) },
			{ status: 201 }
		);
	} catch (error) {
		if (error instanceof ZodError) {
			return NextResponse.json({ error }, { status: 400 });
		}
		return NextResponse.json({ error }, { status: 500 });
	}
}
