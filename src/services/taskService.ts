import prisma from "@/lib/prisma";
import { taskType } from "@/utils/validations";

export default class TaskService {
	static async readAllBySubject(subjectId: string) {
		const allTasks = await prisma.task.findMany({
			where: { subjectId },
			include: { notes: true }
		});
		return allTasks;
	}

	static async readOne(id: string) {
		const foundTask = await prisma.task.findUnique({
			where: { id },
			include: { notes: true },
			omit: { subjectId: false }
		});
		return foundTask;
	}

	static async create(data: taskType, subjectId: string) {
		const newTask = await prisma.task.create({
			data: {
				subjectId,
				...data
			},
			include: { notes: true },
			omit: { subjectId: false }
		});
		return newTask;
	}

	static async update(id: string, data: taskType, subjectId: string) {
		const updatedTask = await prisma.task.update({
			data: { subjectId, ...data },
			where: { id },
			include: { notes: true },
			omit: { subjectId: false }
		});
		return updatedTask;
	}

	static async delete(id: string) {
		const deletedTask = await prisma.task.delete({
			where: { id },
			include: { notes: true },
			omit: { subjectId: false }
		});
		return deletedTask;
	}
}
