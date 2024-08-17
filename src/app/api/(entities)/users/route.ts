import prisma from "@/lib/prisma";
import { encrypt, validatedFields } from "@/utils/userUtils";
import { response, success } from "@/utils/response";

export const GET = () =>
	response(async () => {
		const users = await prisma.user.findMany();
		return success(users);
	});

export const POST = (request: Request) =>
	response(async () => {
		const { password, ...user } = validatedFields(await request.json());

		const newUser = await prisma.user.create({
			data: {
				password: await encrypt(password),
				...user
			}
		});

		return success(newUser, 201);
	});
