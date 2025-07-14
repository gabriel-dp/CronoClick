import { NextResponse } from "next/server";

import AttachmentService from "@/services/attachmentService";
import { fail, response, success } from "@/utils/response";

type paramsRequest = { params: { attachmentId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const found = await AttachmentService.readOne(params.attachmentId);
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
		await AttachmentService.delete(params.attachmentId);
		return success({}, 204);
	});
