import prisma from "@/lib/prisma";
import { validatedFieldsSchedule } from "@/utils/validations";
import { response, success } from "@/utils/response";

type paramsSchedule = { params: { userId: string } };

export const GET = (request: Request, { params }: paramsSchedule) =>
	response(async () => {
		const schedules = await prisma.schedule.findMany({
			where: {
				userId: params.userId
			},
			select: {
				id: true,
				name: true
			}
		});

		return success(schedules);
	});

export const POST = (request: Request, { params }: paramsSchedule) =>
	response(async () => {
		const schedule = await request.json();
		const validatedSchedule = validatedFieldsSchedule(schedule);

		console.log("teste");

		const newSchedule = await prisma.schedule.create({
			data: {
				userId: params.userId,
				...validatedSchedule
			},
			include: {
				subjects: true
			}
		});

		return success(newSchedule, 201);
	});
