import prisma from "@/lib/prisma";
import { Subject } from "@/types/schedules";
import { fail, response, success } from "@/utils/response";
import { validatedFieldsSubject } from "@/utils/validations";

type paramsSchedule = { params: { subjectId: string } };

export const GET = (request: Request, { params }: paramsSchedule) =>
	response(async () => {
		const found = await prisma.subject.findUnique({
			where: { id: params.subjectId },
			include: {
				times: true,
				tasks: true
			},
			omit: { scheduleId: false }
		});

		if (!found) return fail(404);
		return success(found);
	});

export const PUT = (request: Request, { params }: paramsSchedule) =>
	response(async () => {
		const subject: Subject = await request.json();
		const { times, ...validatedSubject } = validatedFieldsSubject(subject);

		const updatedSubject = await prisma.subject.update({
			data: {
				times: {
					deleteMany: { subjectId: params.subjectId },
					createMany: { data: times }
				},
				...validatedSubject
			},
			where: { id: params.subjectId },
			include: {
				times: true,
				tasks: true
			},
			omit: { scheduleId: false }
		});

		return success(updatedSubject, 201);
	});

export const DELETE = (request: Request, { params }: paramsSchedule) =>
	response(async () => {
		const deleted = await prisma.subject.delete({
			where: { id: params.subjectId },
			include: {
				times: true,
				tasks: true
			},
			omit: { scheduleId: false }
		});

		return success(deleted);
	});
