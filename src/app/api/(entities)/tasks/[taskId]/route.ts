import prisma from "@/lib/prisma";
import { fail, response, success } from "@/utils/response";
import { taskSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { taskId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const found = await prisma.task.findUnique({
			where: { id: params.taskId },
			include: { notes: true },
			omit: { subjectId: false }
		});

		if (!found) return fail(404);
		return success(found);
	});

export const PUT = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const validatedTask = validateFields(await request.json(), taskSchema);

		const updated = await prisma.task.update({
			data: validatedTask,
			where: { id: params.taskId },
			include: { notes: true },
			omit: { subjectId: false }
		});

		return success(updated, 201);
	});

export const DELETE = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const deleted = await prisma.task.delete({
			where: { id: params.taskId },
			include: { notes: true },
			omit: { subjectId: false }
		});

		return success(deleted);
	});
