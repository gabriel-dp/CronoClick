import prisma from "@/lib/prisma";
import { response, success } from "@/utils/response";
import { scheduleSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { userId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
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

export const POST = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const validatedSchedule = validateFields(
			await request.json(),
			scheduleSchema
		);

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
