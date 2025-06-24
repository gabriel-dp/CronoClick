import prisma from "@/lib/prisma";
import { response, success } from "@/utils/response";
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
		const file = (await request.json()).file;

		const validatedAttachment = validateFields(
			{
				filename: file?.originalname,
				contentType: file?.mimetype,
				base64Data: file?.buffer.toString("base64")
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
