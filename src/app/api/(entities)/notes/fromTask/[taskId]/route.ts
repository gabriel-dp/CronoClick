import prisma from "@/lib/prisma";
import { response, success } from "@/utils/response";
import { noteSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { taskId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const notes = await prisma.note.findMany({
			where: { taskId: params.taskId }
		});

		return success(notes);
	});

export const POST = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const validatedNote = validateFields(await request.json(), noteSchema);

		const newNote = await prisma.note.create({
			data: {
				taskId: params.taskId,
				...validatedNote
			}
		});

		return success(newNote, 201);
	});
