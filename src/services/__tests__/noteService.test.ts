import prisma from "@/lib/prisma";
import { invalidId } from "@/utils/testUtils";

import NoteService from "../noteService";
import {
	testUser,
	testSchedule,
	testSubject,
	testNote,
	testTask
} from "./__utils__";

describe("NoteService", () => {
	let userId: string;
	let taskId: string;
	let createdNoteId: string;
	const noteData = testNote();

	beforeAll(async () => {
		const userData = testUser();
		const scheduleData = testSchedule();
		const subjectData = testSubject();
		const taskData = testTask();
		const user = await prisma.user.create({ data: userData });
		userId = user.id;
		const schedule = await prisma.schedule.create({
			data: { ...scheduleData, userId }
		});
		const subject = await prisma.subject.create({
			data: {
				...subjectData,
				times: {
					createMany: {
						data: subjectData.times
					}
				},
				scheduleId: schedule.id
			}
		});
		const task = await prisma.task.create({
			data: {
				...taskData,
				subjectId: subject.id
			}
		});
		taskId = task.id;
	});

	afterAll(async () => {
		await prisma.user.delete({ where: { id: userId } });
	});

	describe("create", () => {
		it("should create a note", async () => {
			const note = await NoteService.create(noteData, taskId);
			createdNoteId = note.id;

			expect(note).toHaveProperty("id");
			expect(note.description).toBe(noteData.description);

			const notes = await prisma.note.findMany({
				where: { taskId }
			});
			expect(notes.length).toBe(1);
			expect(notes[0].id).toBe(note.id);
		});
	});

	describe("readOne", () => {
		it("should read a note by id", async () => {
			const note = await NoteService.readOne(createdNoteId);
			expect(note).not.toBeNull();
			if (note) {
				expect(note.id).toBe(createdNoteId);
				expect(note.description).toBe(noteData.description);
			}
		});

		it("should not read a note with invalid id", async () => {
			const note = await NoteService.readOne(invalidId);
			expect(note).toBeNull();
		});
	});

	describe("readAll", () => {
		it("should read all notes from schedule", async () => {
			const notes = await NoteService.readAllByTask(taskId);
			expect(Array.isArray(notes)).toBe(true);
			expect(notes.some((s) => s.id == createdNoteId)).toBe(true);
		});
	});

	describe("update", () => {
		it("should update note data", async () => {
			const newData = testNote();

			const updated = await NoteService.update(createdNoteId, newData);
			expect(updated.id).toBe(createdNoteId);
			expect(updated.description).toBe(newData.description);
		});

		it("should not update a note data with an invalid id", async () => {
			await expect(
				NoteService.update(invalidId, noteData)
			).rejects.toThrow();
		});
	});

	describe("delete", () => {
		it("should delete a note just once", async () => {
			const deleted = await NoteService.delete(createdNoteId);
			expect(deleted.id).toBe(createdNoteId);

			const note = await NoteService.readOne(createdNoteId);
			expect(note).toBeNull();

			await expect(NoteService.delete(createdNoteId)).rejects.toThrow();
		});

		it("should not delete a note with an invalid id", async () => {
			await expect(NoteService.delete(invalidId)).rejects.toThrow();
		});
	});
});
