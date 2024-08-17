import prisma from "@/lib/prisma";
import { Schedule } from "@/types/schedules";
import { fail, response, success } from "@/utils/response";
import { validatedFieldsSchedule } from "@/utils/validations";

type paramsSchedule = { params: { scheduleId: string } };

export const GET = (request: Request, { params }: paramsSchedule) =>
	response(async () => {
		const found = await prisma.schedule.findUnique({
			where: { id: params.scheduleId },
			include: {
				subjects: {
					include: {
						tasks: true,
						times: true
					}
				}
			},
			omit: { userId: false }
		});

		if (found == null) return fail(404);
		return success(found);
	});

export const PUT = (request: Request, { params }: paramsSchedule) =>
	response(async () => {
		const schedule: Schedule = await request.json();
		const validatedSchedule = validatedFieldsSchedule(schedule);

		const updatedSchedule = await prisma.schedule.update({
			data: validatedSchedule,
			where: { id: params.scheduleId },
			omit: { userId: false }
		});

		return success(updatedSchedule, 201);
	});

export const DELETE = (request: Request, { params }: paramsSchedule) =>
	response(async () => {
		const deleted = await prisma.schedule.delete({
			where: { id: params.scheduleId },
			omit: { userId: false }
		});

		return success(deleted);
	});
