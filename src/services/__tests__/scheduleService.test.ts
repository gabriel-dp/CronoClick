import prisma from "@/lib/prisma";

import ScheduleService from "../scheduleService";
import { invalidId, testSchedule, testUser } from "./__utils__";

describe("ScheduleService", () => {
	let userId: string;
	let createdScheduleId: string;
	const scheduleData = testSchedule();

	beforeAll(async () => {
		const user = await prisma.user.create({ data: testUser() });
		userId = user.id;
	});

	afterAll(async () => {
		await prisma.user.delete({ where: { id: userId } });
	});

	describe("create", () => {
		it("should create a schedule with no subjects", async () => {
			const schedule = await ScheduleService.create(scheduleData, userId);
			createdScheduleId = schedule.id;

			expect(schedule).toHaveProperty("id");
			expect(schedule.name).toBe(scheduleData.name);
			expect(schedule.userId).toBe(userId);
			expect(Array.isArray(schedule.subjects)).toBe(true);
			expect(schedule.subjects.length).toBe(0);

			const schedules = await prisma.schedule.findMany({
				where: { userId }
			});
			expect(schedules.length).toBe(1);
			expect(schedules[0].id).toBe(schedule.id);
		});
	});

	describe("readOne", () => {
		it("should read a schedule by id", async () => {
			const schedule = await ScheduleService.readOne(createdScheduleId);
			expect(schedule).not.toBeNull();
			if (schedule) {
				expect(schedule.id).toBe(createdScheduleId);
				expect(schedule.name).toBe(scheduleData.name);
			}
		});

		it("should not read a schedule with invalid id", async () => {
			const schedule = await ScheduleService.readOne(invalidId);
			expect(schedule).toBeNull();
		});
	});

	describe("readAll", () => {
		it("should read all schedules from user", async () => {
			const schedules = await ScheduleService.readAllByUser(userId);
			expect(Array.isArray(schedules)).toBe(true);
			expect(schedules.some((s) => s.id == createdScheduleId)).toBe(true);
		});
	});

	describe("update", () => {
		it("should update schedule data", async () => {
			const newData = testSchedule();

			const updated = await ScheduleService.update(
				createdScheduleId,
				newData
			);
			expect(updated.id).toBe(createdScheduleId);
			expect(updated.name).toBe(newData.name);
			expect(updated.userId).toBe(userId);
		});

		it("should not update a schedule data with an invalid id", async () => {
			await expect(
				ScheduleService.update(invalidId, scheduleData)
			).rejects.toThrow();
		});
	});

	describe("delete", () => {
		it("should delete a schedule just once", async () => {
			const deleted = await ScheduleService.delete(createdScheduleId);
			expect(deleted.id).toBe(createdScheduleId);

			const schedule = await ScheduleService.readOne(createdScheduleId);
			expect(schedule).toBeNull();

			await expect(
				ScheduleService.delete(createdScheduleId)
			).rejects.toThrow();
		});

		it("should not delete a schedule with an invalid id", async () => {
			await expect(ScheduleService.delete(invalidId)).rejects.toThrow();
		});
	});
});
