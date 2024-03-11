import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import prisma from "@/lib/prisma";
import { encrypt, removePassword, validatedFields } from "@/utils/userUtils";

type paramsUser = { params: { id: string } };

export async function GET(request: Request, { params }: paramsUser) {
	try {
		const { id } = params;

		const user = await prisma.user.findUnique({
			where: { id: id }
		});

		if (!user) {
			return NextResponse.json(
				{ message: "User does not exist" },
				{ status: 422 }
			);
		}

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
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				const message = `User does not exist`;
				return NextResponse.json({ error, message }, { status: 422 });
			}
		}
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function PUT(request: Request, { params }: paramsUser) {
	try {
		const { id } = params;

		const { username, password, email } = validatedFields(
			await request.json()
		);

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
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				const target = error.meta?.target;
				const message = `Unique constraint violation, check the field '${target}'`;
				return NextResponse.json({ error, message }, { status: 422 });
			}
		} else if (error instanceof ZodError) {
			return NextResponse.json(
				{ error, message: "Invalid fields" },
				{ status: 400 }
			);
		}

		return NextResponse.json({ error }, { status: 500 });
	}
}
