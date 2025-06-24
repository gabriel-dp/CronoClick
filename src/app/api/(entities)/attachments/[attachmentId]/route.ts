import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { fail, response, success } from "@/utils/response";

type paramsRequest = { params: { attachmentId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const found = await prisma.attachment.findUnique({
			where: { id: params.attachmentId },
			omit: { taskId: false }
		});

		if (!found) return fail(404);

		const fileBuffer = Buffer.from(found.base64Data, "base64");

		return new NextResponse(fileBuffer, {
			status: 200,
			headers: {
				"Content-Type": found.contentType,
				"Content-Disposition": `attachment; filename="${found.filename}"`
			}
		});
	});

export const DELETE = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const deleted = await prisma.attachment.delete({
			where: { id: params.attachmentId },
			omit: { taskId: false, base64Data: true }
		});

		return success(deleted);
	});
