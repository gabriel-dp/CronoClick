import prisma from "@/lib/prisma";
import { attachmentType } from "@/utils/validations";

export default class AttachmentService {
	static async readAllByTask(taskId: string) {
		const allAttachments = await prisma.attachment.findMany({
			where: { taskId },
			select: {
				id: true,
				filename: true
			}
		});
		return allAttachments;
	}

	static async readOne(id: string) {
		const foundAttachment = await prisma.attachment.findUnique({
			where: { id },
			select: {
				id: true,
				filename: true,
				contentType: true,
				base64Data: true
			}
		});
		return foundAttachment;
	}

	static async create(data: attachmentType, taskId: string) {
		const newAttachment = await prisma.attachment.create({
			data: {
				...data,
				task: {
					connect: { id: taskId }
				}
			},
			omit: { taskId: false }
		});
		return newAttachment;
	}

	static async delete(id: string) {
		const deletedAttachment = await prisma.attachment.delete({
			where: { id },
			omit: { taskId: false }
		});
		return deletedAttachment;
	}
}
