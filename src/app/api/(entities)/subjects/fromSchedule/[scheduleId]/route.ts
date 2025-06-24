import SubjectService from "@/services/subjectService";
import { response, success } from "@/utils/response";
import { subjectSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { scheduleId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const allSubjects = await SubjectService.readAllBySchedule(
			params.scheduleId
		);
		return success(allSubjects);
	});

export const POST = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const data = validateFields(await request.json(), subjectSchema);
		const newSubject = await SubjectService.create(data, params.scheduleId);
		return success(newSubject, 201);
	});
