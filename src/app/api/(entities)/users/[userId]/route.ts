import prisma from "@/lib/prisma";
import { encrypt, validatedFields } from "@/utils/userUtils";
import { fail, response, success } from "@/utils/response";

type paramsUser = { params: { userId: string } };

export const GET = (request: Request, { params }: paramsUser) =>
	response(async () => {
		const user = await prisma.user.findUnique({
			where: { id: params.userId }
		});

		if (!user) return fail(404);
		return success(user);
	});

export const PUT = (request: Request, { params }: paramsUser) =>
	response(async () => {
		const { password, ...user } = validatedFields(await request.json());

		const updated = await prisma.user.update({
			where: { id: params.userId },
			data: {
				password: await encrypt(password),
				...user
			}
		});

		return success(updated);
	});

export const DELETE = (request: Request, { params }: paramsUser) =>
	response(async () => {
		const deleted = await prisma.user.delete({
			where: { id: params.userId }
		});

		return success(deleted);
	});
