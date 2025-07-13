import prisma from "@/lib/prisma";
import {
	api,
	expectRequestFail,
	expectRequestSuccess,
	invalidId
} from "@/utils/testUtils";
import {
	testSchedule,
	testSubject,
	testTask,
	testUser
} from "@/services/__tests__/__utils__";

describe("/notes/", () => {
	let userId: string;
	let scheduleId: string;
	let subjectId: string;
	let taskId: string;
	let noteId: string;

	const noteData = {
		description: "Resumo do conteúdo"
	};

	beforeAll(async () => {
		const user = await prisma.user.create({ data: testUser() });
		userId = user.id;

		const schedule = await prisma.schedule.create({
			data: { ...testSchedule(), userId }
		});
		scheduleId = schedule.id;

		const subject = await prisma.subject.create({
			data: {
				...testSubject(),
				times: {
					createMany: {
						data: testSubject().times
					}
				},
				scheduleId
			}
		});
		subjectId = subject.id;

		const task = await prisma.task.create({
			data: {
				...testTask(),
				subjectId
			}
		});
		taskId = task.id;
	});

	afterAll(async () => {
		await prisma.user.delete({ where: { id: userId } });
	});

	describe("POST", () => {
		it("should create a note - 201", async () => {
			const response = await expectRequestSuccess(201, () =>
				api.post(`/notes/fromTask/${taskId}`, noteData)
			);

			expect(response?.data).toHaveProperty("id");
			expect(response?.data.description).toBe(noteData.description);

			noteId = response?.data.id;
		});

		it("should not create a note with invalid data - 400", async () => {
			await expectRequestFail(400, () =>
				api.post(`/notes/fromTask/${taskId}`)
			);
		});
	});

	describe("GET", () => {
		it("should get a note by ID - 200", async () => {
			const response = await expectRequestSuccess(200, () =>
				api.get(`/notes/${noteId}`)
			);

			expect(response?.data).toHaveProperty("id", noteId);
			expect(response?.data.description).toBe(noteData.description);
		});

		it("should not get a note with invalid ID - 404", async () => {
			await expectRequestFail(404, () => api.get(`/notes/${invalidId}`));
		});

		it("should list all notes from a task - 200", async () => {
			const response = await expectRequestSuccess(200, () =>
				api.get(`/notes/fromTask/${taskId}`)
			);

			expect(Array.isArray(response?.data)).toBe(true);
			expect(response?.data.length).toBe(1);
			expect(response?.data[0].id).toBe(noteId);
		});
	});

	describe("PUT", () => {
		it("should update a note by ID - 201", async () => {
			const updated = {
				description: "Conteúdo atualizado"
			};

			const response = await expectRequestSuccess(201, () =>
				api.put(`/notes/${noteId}`, updated)
			);

			expect(response?.data).toHaveProperty("id", noteId);
			expect(response?.data.description).toBe(updated.description);
		});

		it("should not update a note with invalid ID - 404", async () => {
			await expectRequestFail(404, () =>
				api.put(`/notes/${invalidId}`, noteData)
			);
		});
	});

	describe("DELETE", () => {
		it("should delete a note by ID - 204", async () => {
			const response = await expectRequestSuccess(204, () =>
				api.delete(`/notes/${noteId}`)
			);
			expect(response?.data).toBe("");

			await expectRequestFail(404, () => api.delete(`/notes/${noteId}`));
		});

		it("should not delete with invalid ID - 404", async () => {
			await expectRequestFail(404, () =>
				api.delete(`/notes/${invalidId}`)
			);
		});
	});
});
