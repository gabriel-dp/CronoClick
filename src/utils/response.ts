import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

type SuccessCode = 200 | 201;
type ErrorCode = 400 | 401 | 404 | 409 | 500;

const ERRORS_MESSAGES: { [E in ErrorCode]: string } = {
	400: "Bad Request",
	401: "Unauthorized",
	404: "Resource not found",
	409: "Conflict",
	500: "Internal Error"
};

const PRISMA_ERRORS: { [key: string]: ErrorCode } = {
	P2002: 409,
	P2023: 400,
	P2025: 404
};

export async function response(action: () => Promise<NextResponse>) {
	try {
		return await action();
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.log(error);
			if (PRISMA_ERRORS[error.code] != undefined)
				return fail(PRISMA_ERRORS[error.code], error);
		} else if (error instanceof ZodError) {
			return fail(400, error);
		}
		return fail(500, error);
	}
}

export function fail(
	code: keyof typeof ERRORS_MESSAGES,
	error?: unknown
): NextResponse {
	return NextResponse.json(
		{ message: ERRORS_MESSAGES[code], error },
		{ status: code }
	);
}

export function success<T>(res: T, code: SuccessCode = 200): NextResponse {
	return NextResponse.json(res, { status: code });
}
