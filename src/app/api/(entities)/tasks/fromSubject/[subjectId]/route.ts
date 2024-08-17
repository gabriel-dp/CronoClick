import prisma from "@/lib/prisma";
import { response, success } from "@/utils/response";
import { taskSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { subjectId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const tasks = await prisma.task.findMany({
			where: { subjectId: params.subjectId },
			include: { notes: true }
		});

		return success(tasks);
	});

export const POST = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const validatedTask = validateFields(await request.json(), taskSchema);

		const newTask = await prisma.task.create({
			data: {
				subjectId: params.subjectId,
				...validatedTask
			},
			include: { notes: true }
		});

		return success(newTask, 201);
	});
