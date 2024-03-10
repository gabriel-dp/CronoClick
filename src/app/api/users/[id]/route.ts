import { NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "@/lib/prisma";
import {
	dataConflict,
	encrypt,
	removePassword,
	validatedFields
} from "@/utils/userUtils";

type paramsUser = { params: { id: string } };

export async function GET(request: Request, { params }: paramsUser) {
	try {
		const { id } = params;

		const user = await prisma.user.findUnique({
			where: { id: id }
		});

		return NextResponse.json(
			{ user: removePassword(user) },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: paramsUser) {
	try {
		const { id } = params;

		const user = await prisma.user.delete({
			where: { id: id }
		});

		return NextResponse.json(
			{ user: removePassword(user) },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function PUT(request: Request, { params }: paramsUser) {
	try {
		const { id } = params;

		const { username, password, email } = validatedFields(
			await request.json()
		);

		// check if data conflicts
		const conflict = await dataConflict(id, username, email);
		if (conflict) return conflict;

		const user = await prisma.user.update({
			where: { id: id },
			data: {
				username,
				password: await encrypt(password),
				email
			}
		});

		return NextResponse.json(
			{ user: removePassword(user) },
			{ status: 200 }
		);
	} catch (error) {
		if (error instanceof ZodError) {
			return NextResponse.json({ error }, { status: 400 });
		}
		return NextResponse.json({ error }, { status: 500 });
	}
}
