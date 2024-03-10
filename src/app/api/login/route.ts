import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { compareEncrypted, removePassword } from "@/utils/userUtils";

export const POST = async (request: Request) => {
	try {
		const { username, password } = await request.json();

		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 401 }
			);
		}

		const passwordMatch = await compareEncrypted(password, user.password);
		if (!passwordMatch) {
			return NextResponse.json(
				{ error: "Credentials does not match" },
				{ status: 401 }
			);
		}

		return NextResponse.json(
			{ user: removePassword(user) },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
};
