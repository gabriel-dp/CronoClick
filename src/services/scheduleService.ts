import prisma from "@/lib/prisma";
import { scheduleType } from "@/utils/validations";

export default class ScheduleService {
	static async readAllByUser(userId: string) {
		const allSchedules = await prisma.schedule.findMany({
			where: { userId },
			select: {
				id: true,
				name: true
			}
		});
		return allSchedules;
	}

	static async readOne(id: string) {
		const foundSchedule = await prisma.schedule.findUnique({
			where: { id },
			include: {
				subjects: {
					include: {
						times: true,
						tasks: {
							include: {
								notes: true,
								attachments: true
							}
						}
					}
				}
			},
			omit: { userId: false }
		});
		return foundSchedule;
	}

	static async create(data: scheduleType, userId: string) {
		const newSchedule = await prisma.schedule.create({
			data: {
				...data,
				user: {
					connect: { id: userId }
				}
			},
			include: {
				subjects: true
			},
			omit: { userId: false }
		});
		return newSchedule;
	}

	static async update(id: string, data: scheduleType) {
		const updatedSchedule = await prisma.schedule.update({
			where: { id },
			data,
			omit: { userId: false }
		});
		return updatedSchedule;
	}

	static async delete(id: string) {
		const deletedSchedule = await prisma.schedule.delete({
			where: { id },
			omit: { userId: false }
		});
		return deletedSchedule;
	}
}
