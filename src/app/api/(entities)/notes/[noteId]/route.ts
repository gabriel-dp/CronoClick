import prisma from "@/lib/prisma";
import { fail, response, success } from "@/utils/response";
import { noteSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { noteId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const found = await prisma.note.findUnique({
			where: { id: params.noteId },
			omit: { taskId: false }
		});

		if (!found) return fail(404);
		return success(found);
	});

export const PUT = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const validatedNote = validateFields(await request.json(), noteSchema);

		const updated = await prisma.note.update({
			data: validatedNote,
			where: { id: params.noteId },
			omit: { taskId: false }
		});

		return success(updated, 201);
	});

export const DELETE = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const deleted = await prisma.note.delete({
			where: { id: params.noteId },
			omit: { taskId: false }
		});

		return success(deleted);
	});
