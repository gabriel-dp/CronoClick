import AttachmentService from "@/services/attachmentService";
import { response, success, fail } from "@/utils/response";
import { attachmentSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { taskId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const attachmentsData = await AttachmentService.readAllByTask(
			params.taskId
		);
		return success(attachmentsData);
	});

export const POST = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		if (process.env.NEXT_PUBLIC_FLAG_ATTACHMENTS)
			return fail(400, "Unavaliable resource");

		const filesAlreadyAttached = await AttachmentService.readAllByTask(
			params.taskId
		);
		if (filesAlreadyAttached.length >= 3) {
			return fail(409, "Too many files");
		}

		const file = (await request.formData()).get("file");

		if (!file || !(file instanceof File)) {
			return fail(400, "File invalid");
		}

		const MAX_SIZE = 3 * 1024 * 1024;
		if (file.size > MAX_SIZE) {
			return fail(413, "File too large");
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

		const newAttachment = await AttachmentService.create(
			validatedAttachment,
			params.taskId
		);

		return success(newAttachment, 201);
	});
