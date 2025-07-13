import NoteService from "@/services/noteService";
import { fail, response, success } from "@/utils/response";
import { noteSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { noteId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const foundNote = await NoteService.readOne(params.noteId);
		if (!foundNote) return fail(404);
		return success(foundNote);
	});

export const PUT = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const data = validateFields(await request.json(), noteSchema);
		const updatedNote = await NoteService.update(params.noteId, data);
		return success(updatedNote, 201);
	});

export const DELETE = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		await NoteService.delete(params.noteId);
		return success({}, 204);
	});
