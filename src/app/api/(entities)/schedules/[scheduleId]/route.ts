import prisma from "@/lib/prisma";
import { fail, response, success } from "@/utils/response";
import { scheduleSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { scheduleId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const found = await prisma.schedule.findUnique({
			where: { id: params.scheduleId },
			include: {
				subjects: {
					include: {
						times: true,
						tasks: {
							include: {
								notes: true,
								attachments: {
									select: {
										id: true,
										filename: true
									}
								}
							}
						}
					}
				}
			},
			omit: { userId: false }
		});

		if (!found) return fail(404);
		return success(found);
	});

export const PUT = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const validatedSchedule = validateFields(
			await request.json(),
			scheduleSchema
		);

		const updatedSchedule = await prisma.schedule.update({
			data: validatedSchedule,
			where: { id: params.scheduleId },
			omit: { userId: false }
		});

		return success(updatedSchedule, 201);
	});

export const DELETE = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const deleted = await prisma.schedule.delete({
			where: { id: params.scheduleId },
			omit: { userId: false }
		});

		return success(deleted);
	});
