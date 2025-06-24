import SubjectService from "@/services/subjectService";
import { fail, response, success } from "@/utils/response";
import { subjectSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { subjectId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const foundSubject = await SubjectService.readOne(params.subjectId);
		if (!foundSubject) return fail(404);
		return success(foundSubject);
	});

export const PUT = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const data = validateFields(await request.json(), subjectSchema);
		const updatedSubject = await SubjectService.update(
			params.subjectId,
			data
		);
		return success(updatedSubject, 201);
	});

export const DELETE = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const deletedSchedule = await SubjectService.delete(params.subjectId);
		return success(deletedSchedule);
	});
