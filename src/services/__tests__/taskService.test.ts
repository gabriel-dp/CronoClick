import prisma from "@/lib/prisma";
import { invalidId } from "@/utils/testUtils";

import TaskService from "../taskService";
import { testUser, testSchedule, testSubject, testTask } from "./__utils__";

describe("TaskService", () => {
	let userId: string;
	let subjectId: string;
	let createdTaskId: string;
	const taskData = testTask();

	beforeAll(async () => {
		const userData = testUser();
		const scheduleData = testSchedule();
		const subjectData = testSubject();
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
		subjectId = subject.id;
	});

	afterAll(async () => {
		await prisma.user.delete({ where: { id: userId } });
	});

	describe("create", () => {
		it("should create a task", async () => {
			const task = await TaskService.create(taskData, subjectId);
			createdTaskId = task.id;

			expect(task).toHaveProperty("id");
			expect(task.name).toBe(taskData.name);
			expect(task.finished).toBe(taskData.finished);
			expect(task.submission).toBe(taskData.submission);
			expect(task.subjectId).toBe(subjectId);
			expect(Array.isArray(task.notes)).toBe(true);
			expect(task.notes.length).toBe(0);

			const tasks = await prisma.task.findMany({
				where: { subjectId }
			});
			expect(tasks.length).toBe(1);
			expect(tasks[0].id).toBe(task.id);
		});
	});

	describe("readOne", () => {
		it("should read a task by id", async () => {
			const task = await TaskService.readOne(createdTaskId);
			expect(task).not.toBeNull();
			if (task) {
				expect(task.id).toBe(createdTaskId);
				expect(task.name).toBe(taskData.name);
				expect(task.finished).toBe(taskData.finished);
				expect(task.submission).toBe(taskData.submission);
				expect(Array.isArray(task.notes)).toBe(true);
				expect(task.notes.length).toBe(0);
			}
		});

		it("should not read a task with invalid id", async () => {
			const task = await TaskService.readOne(invalidId);
			expect(task).toBeNull();
		});
	});

	describe("readAll", () => {
		it("should read all tasks from subject", async () => {
			const tasks = await TaskService.readAllBySubject(subjectId);
			expect(Array.isArray(tasks)).toBe(true);
			expect(tasks.some((s) => s.id == createdTaskId)).toBe(true);
		});
	});

	describe("update", () => {
		it("should update task data", async () => {
			const newData = testTask();

			const updated = await TaskService.update(
				createdTaskId,
				newData,
				subjectId
			);
			expect(updated.id).toBe(createdTaskId);
			expect(updated.name).toBe(newData.name);
			expect(updated.finished).toBe(newData.finished);
			expect(updated.submission).toBe(newData.submission);
			expect(Array.isArray(updated.notes)).toBe(true);
			expect(updated.notes.length).toBe(0);
		});

		it("should not update a task data with an invalid id", async () => {
			await expect(
				TaskService.update(invalidId, taskData, createdTaskId)
			).rejects.toThrow();
		});
	});

	describe("delete", () => {
		it("should delete a task just once", async () => {
			const deleted = await TaskService.delete(createdTaskId);
			expect(deleted.id).toBe(createdTaskId);

			const task = await TaskService.readOne(createdTaskId);
			expect(task).toBeNull();

			await expect(TaskService.delete(createdTaskId)).rejects.toThrow();
		});

		it("should not delete a task with an invalid id", async () => {
			await expect(TaskService.delete(invalidId)).rejects.toThrow();
		});
	});
});
