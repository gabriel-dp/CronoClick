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
	testUser
} from "@/services/__tests__/__utils__";

describe("/tasks/", () => {
	let userId: string;
	let scheduleId: string;
	let subjectId: string;
	let subjectId2: string;
	let taskId: string;

	const taskData = {
		name: "Trabalho 1",
		finished: false,
		submission: `2025-06-19`
	};

	beforeAll(async () => {
		const user = await prisma.user.create({ data: testUser() });
		userId = user.id;
		const schedule = await prisma.schedule.create({
			data: {
				...testSchedule(),
				userId
			}
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
		const subject2 = await prisma.subject.create({
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
		subjectId2 = subject2.id;
	});

	afterAll(async () => {
		await prisma.user.delete({ where: { id: userId } });
	});

	describe("POST", () => {
		it("should create a task - 201", async () => {
			const response = await expectRequestSuccess(201, () =>
				api.post(`/tasks/fromSubject/${subjectId}`, taskData)
			);

			expect(response?.status).toBe(201);
			expect(response?.data).toHaveProperty("id");
			expect(response?.data.name).toBe(taskData.name);
			expect(response?.data.finished).toBe(taskData.finished);
			expect(response?.data.submission).toBe(taskData.submission);

			taskId = response?.data.id;
		});

		it("should not create a task with invalid data - 400", async () => {
			await expectRequestFail(400, () =>
				api.post(`/tasks/fromSubject/${subjectId}`, {
					...taskData,
					name: "" // invalid name
				})
			);
			await expectRequestFail(400, () =>
				api.post(`/tasks/fromSubject/${subjectId}`, {
					...taskData,
					submission: "" // invalid submission
				})
			);
			await expectRequestFail(400, () =>
				api.post(`/tasks/fromSubject/${subjectId}`, {
					...taskData,
					submission: "19-06-2025" // invalid submission format
				})
			);
		});
	});

	describe("GET", () => {
		it("should fetch a task by ID - 200", async () => {
			const response = await expectRequestSuccess(200, () =>
				api.get(`/tasks/${taskId}`)
			);

			expect(response?.data).toHaveProperty("id", taskId);
			expect(response?.data.name).toBe(taskData.name);
			expect(response?.data.finished).toBe(taskData.finished);
			expect(response?.data.submission).toBe(taskData.submission);
		});

		it("should not fetch a task with invalid ID - 404", async () => {
			await expectRequestFail(404, () => api.get(`/tasks/${invalidId}`));
		});

		it("should list all tasks from a subject - 200", async () => {
			const response = await expectRequestSuccess(200, () =>
				api.get(`/tasks/fromSubject/${subjectId}`)
			);

			expect(Array.isArray(response?.data)).toBe(true);
			expect(response?.data.length).toBe(1);
			expect(response?.data[0].id).toBe(taskId);
			expect(response?.data[0].name).toBe(taskData.name);
			expect(response?.data[0].finished).toBe(taskData.finished);
			expect(response?.data[0].submission).toBe(taskData.submission);
		});
	});

	describe("PUT", () => {
		it("should update a task by ID - 201", async () => {
			const updatedTask = {
				name: "Trabalho 2",
				finished: true,
				submission: `2025-08-17`,
				subjectId: subjectId2
			};

			const response = await expectRequestSuccess(201, () =>
				api.put(`/tasks/${taskId}`, updatedTask)
			);

			expect(response?.data).toHaveProperty("id", taskId);
			expect(response?.data.name).toBe(updatedTask.name);
			expect(response?.data.finished).toBe(updatedTask.finished);
			expect(response?.data.submission).toBe(updatedTask.submission);
			expect(response?.data.subjectId).toBe(updatedTask.subjectId);
		});

		it("should not update a task with invalid ID - 404", async () => {
			await expectRequestFail(404, () =>
				api.put(`/tasks/${invalidId}`, {
					...taskData,
					subjectId: subjectId2
				})
			);
		});
	});

	describe("DELETE", () => {
		it("should delete a task - 204", async () => {
			const response = await expectRequestSuccess(204, () =>
				api.delete(`/tasks/${taskId}`)
			);
			expect(response?.data).toBe("");

			await expectRequestFail(404, () => api.delete(`/tasks/${taskId}`));
		});

		it("should not delete a task with invalid ID - 404", async () => {
			await expectRequestFail(404, () =>
				api.delete(`/tasks/${invalidId}`)
			);
		});
	});
});
