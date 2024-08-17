import prisma from "@/lib/prisma";
import { encrypt } from "@/utils/userUtils";
import { fail, response, success } from "@/utils/response";
import { userSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { userId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const user = await prisma.user.findUnique({
			where: { id: params.userId }
		});

		if (!user) return fail(404);
		return success(user);
	});

export const PUT = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const { password, ...userWithoutPassword } = validateFields(
			await request.json(),
			userSchema
		);

		const updated = await prisma.user.update({
			where: { id: params.userId },
			data: {
				password: await encrypt(password),
				...userWithoutPassword
			}
		});

		return success(updated);
	});

export const DELETE = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const deleted = await prisma.user.delete({
			where: { id: params.userId }
		});

		return success(deleted);
	});
