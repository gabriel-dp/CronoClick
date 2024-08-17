import prisma from "@/lib/prisma";
import { response, success } from "@/utils/response";
import { subjectSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { scheduleId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
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

export const POST = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const { times, ...validatedSubject } = validateFields(
			await request.json(),
			subjectSchema
		);

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
