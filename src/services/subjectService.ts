import prisma from "@/lib/prisma";
import { subjectType } from "@/utils/validations";

export default class SubjectService {
	static async readAllBySchedule(scheduleId: string) {
		const allSubjects = await prisma.subject.findMany({
			where: { scheduleId },
			include: {
				times: true,
				tasks: true
			}
		});
		return allSubjects;
	}

	static async readOne(id: string) {
		const foundSubject = await prisma.subject.findUnique({
			where: { id },
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
		return foundSubject;
	}

	static async create(data: subjectType, scheduleId: string) {
		const { times, ...dataObject } = data;
		const newSubject = await prisma.subject.create({
			data: {
				...dataObject,
				schedule: {
					connect: {
						id: scheduleId
					}
				},
				times: { createMany: { data: times } }
			},
			include: {
				times: true,
				tasks: true
			},
			omit: { scheduleId: false }
		});
		return newSubject;
	}

	static async update(id: string, data: subjectType) {
		const { times, ...dataObject } = data;
		const updatedSubject = await prisma.subject.update({
			data: {
				...dataObject,
				times: {
					deleteMany: { subjectId: id },
					createMany: { data: times }
				}
			},
			where: { id },
			include: {
				times: true,
				tasks: true
			},
			omit: { scheduleId: false }
		});
		return updatedSubject;
	}

	static async delete(id: string) {
		const deletedSubject = await prisma.subject.delete({
			where: { id },
			include: {
				times: true,
				tasks: true
			},
			omit: { scheduleId: false }
		});
		return deletedSubject;
	}
}
