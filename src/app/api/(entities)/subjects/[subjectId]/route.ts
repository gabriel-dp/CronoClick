import prisma from "@/lib/prisma";
import { fail, response, success } from "@/utils/response";
import { subjectSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { subjectId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const found = await prisma.subject.findUnique({
			where: { id: params.subjectId },
			include: {
				times: true,
				tasks: {
					include: {
						notes: true
					}
				}
			},
			omit: { scheduleId: false }
		});

		if (!found) return fail(404);
		return success(found);
	});

export const PUT = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const { times, ...validatedSubject } = validateFields(
			await request.json(),
			subjectSchema
		);

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

export const DELETE = (request: Request, { params }: paramsRequest) =>
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
