import prisma from "@/lib/prisma";
import { noteType } from "@/utils/validations";

export default class NoteService {
	static async readAllByTask(taskId: string) {
		const allNotes = await prisma.note.findMany({
			where: { taskId }
		});
		return allNotes;
	}

	static async readOne(id: string) {
		const foundNote = await prisma.note.findUnique({
			where: { id },
			omit: { taskId: false }
		});
		return foundNote;
	}

	static async create(data: noteType, taskId: string) {
		const newNote = await prisma.note.create({
			data: {
				...data,
				task: {
					connect: {
						id: taskId
					}
				}
			}
		});
		return newNote;
	}

	static async update(id: string, data: noteType) {
		const updatedNote = await prisma.note.update({
			data,
			where: { id },
			omit: { taskId: false }
		});
		return updatedNote;
	}

	static async delete(id: string) {
		const deletedNote = await prisma.note.delete({
			where: { id },
			omit: { taskId: false }
		});
		return deletedNote;
	}
}
