import TaskService from "@/services/taskService";
import { fail, response, success } from "@/utils/response";
import { taskSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { taskId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const foundTask = await TaskService.readOne(params.taskId);
		if (!foundTask) return fail(404);
		return success(foundTask);
	});

export const PUT = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const { subjectId, ...taskData } = await request.json();
		const data = validateFields(taskData, taskSchema);
		const updatedTask = await TaskService.update(
			params.taskId,
			data,
			subjectId
		);
		return success(updatedTask, 201);
	});

export const DELETE = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const deletedTask = await TaskService.delete(params.taskId);
		return success(deletedTask);
	});
