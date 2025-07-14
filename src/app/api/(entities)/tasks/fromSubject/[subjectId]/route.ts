import TaskService from "@/services/taskService";
import { response, success } from "@/utils/response";
import { taskSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { subjectId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const allTasks = await TaskService.readAllBySubject(params.subjectId);
		return success(allTasks);
	});

export const POST = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const data = validateFields(await request.json(), taskSchema);
		const newTask = await TaskService.create(data, params.subjectId);
		return success(newTask, 201);
	});
