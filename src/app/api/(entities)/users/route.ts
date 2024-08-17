import prisma from "@/lib/prisma";
import { encrypt } from "@/utils/userUtils";
import { response, success } from "@/utils/response";
import { userSchema, validateFields } from "@/utils/validations";

export const GET = () =>
	response(async () => {
		const users = await prisma.user.findMany();
		return success(users);
	});

export const POST = (request: Request) =>
	response(async () => {
		const { password, ...user } = validateFields(
			await request.json(),
			userSchema
		);

		const newUser = await prisma.user.create({
			data: {
				password: await encrypt(password),
				...user
			}
		});

		return success(newUser, 201);
	});
