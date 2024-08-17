import prisma from "@/lib/prisma";
import { validatedFieldsSubject } from "@/utils/validations";
import { response, success } from "@/utils/response";

type paramsSchedule = { params: { scheduleId: string } };

export const GET = (request: Request, { params }: paramsSchedule) =>
	response(async () => {
		const subjects = await prisma.subject.findMany({
			where: { scheduleId: params.scheduleId },
			include: {
				times: true,
				tasks: true
			}
		});
		return success(subjects);
	});

export const POST = (request: Request, { params }: paramsSchedule) =>
	response(async () => {
		const subject = await request.json();
		const { times, ...validatedSubject } = validatedFieldsSubject(subject);

		const newSubject = await prisma.subject.create({
			data: {
				scheduleId: params.scheduleId,
				times: { createMany: { data: times } },
				...validatedSubject
			},
			include: {
				times: true,
				tasks: true
			}
		});

		return success(newSubject, 201);
	});
