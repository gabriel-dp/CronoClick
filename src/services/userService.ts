import prisma from "@/lib/prisma";
import { encrypt } from "@/utils/userUtils";
import { userType } from "@/utils/validations";

export default class UserService {
	static async readAll() {
		const allUsers = await prisma.user.findMany();
		return allUsers;
	}

	static async readOne(id: string) {
		const foundUser = await prisma.user.findUnique({
			where: { id }
		});
		return foundUser;
	}

	static async create(data: userType) {
		const newUser = await prisma.user.create({
			data: {
				...data,
				password: await encrypt(data.password),
				schedules: {
					create: {
						name: "Cronograma"
					}
				}
			}
		});

		return newUser;
	}

	static async update(id: string, data: userType) {
		const updatedUser = await prisma.user.update({
			where: { id },
			data: {
				...data,
				password: await encrypt(data.password)
			}
		});
		return updatedUser;
	}

	static async delete(id: string) {
		const deletedUser = await prisma.user.delete({
			where: { id }
		});
		return deletedUser;
	}
}
