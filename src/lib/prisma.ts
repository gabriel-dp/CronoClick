import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
	return new PrismaClient({
		omit: {
			user: { password: true },
			schedule: { userId: true },
			subject: { scheduleId: true },
			task: { subjectId: true },
			time: { subjectId: true, id: true }
		}
	});
};

declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;
