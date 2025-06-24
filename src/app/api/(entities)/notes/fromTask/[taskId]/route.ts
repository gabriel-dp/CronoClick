import NoteService from "@/services/noteService";
import { response, success } from "@/utils/response";
import { noteSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { taskId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const allNotes = await NoteService.readAllByTask(params.taskId);
		return success(allNotes);
	});

export const POST = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const data = validateFields(await request.json(), noteSchema);
		const newNote = await NoteService.create(data, params.taskId);
		return success(newNote, 201);
	});
