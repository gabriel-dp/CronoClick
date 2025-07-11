import prisma from "@/lib/prisma";
import { response, success, fail } from "@/utils/response";
import { attachmentSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { taskId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const attachments = await prisma.attachment.findMany({
			where: { taskId: params.taskId },
			omit: { base64Data: true }
		});

		return success(attachments);
	});

export const POST = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const file = (await request.formData()).get("file");

		if (!file || !(file instanceof File)) {
			return fail(400, "File invalid");
		}

		const MAX_SIZE = 3 * 1024 * 1024;
		if (file.size > MAX_SIZE) {
			return fail(400, "File too large");
		}

		const validatedAttachment = validateFields(
			{
				filename: file.name,
				contentType: file.type,
				base64Data: Buffer.from(await file.arrayBuffer()).toString(
					"base64"
				)
			},
			attachmentSchema
		);

		const newAttachment = await prisma.attachment.create({
			data: {
				taskId: params.taskId,
				...validatedAttachment
			},
			omit: { base64Data: true }
		});

		return success(newAttachment, 201);
	});
