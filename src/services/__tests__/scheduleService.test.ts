import { ObjectId } from "bson";

import prisma from "@/lib/prisma";
import { scheduleType, userType } from "@/utils/validations";

import ScheduleService from "../scheduleService";

describe("ScheduleService", () => {
	let userId: string;
	let createdScheduleId: string;
	const invalidId: string = new ObjectId().toHexString();

	const testSchedule: scheduleType = {
		name: "Test Schedule"
	};

	beforeAll(async () => {
		const testUser: userType = {
			username: "Test User Schedule",
			email: "test.schedule@example.com",
			password: "securePassword123"
		};
		const user = await prisma.user.create({ data: testUser });
		userId = user.id;
	});

	describe("create", () => {
		it("should create a schedule with no subjects", async () => {
			const schedule = await ScheduleService.create(testSchedule, userId);
			createdScheduleId = schedule.id;

			expect(schedule).toHaveProperty("id");
			expect(schedule.name).toBe(testSchedule.name);
			expect(schedule.userId).toBe(userId);
			expect(Array.isArray(schedule.subjects)).toBe(true);
			expect(schedule.subjects.length).toBe(0);

			const schedules = await prisma.schedule.findMany({
				where: { userId }
			});
			expect(schedules.length).toBe(1);
			expect(schedules.some((s) => s.name == testSchedule.name)).toBe(
				true
			);
		});
	});

	describe("readOne", () => {
		it("should read a schedule by id", async () => {
			const schedule = await ScheduleService.readOne(createdScheduleId);
			expect(schedule).not.toBeNull();
			expect(schedule?.id).toBe(createdScheduleId);
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
			const newData: scheduleType = {
				name: "Test Schedule Updated"
			};

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
				ScheduleService.update(invalidId, testSchedule)
			).rejects.toThrow();
		});
	});

	describe("delete", () => {
		it("should delete a schedule just once", async () => {
			const deleted = await ScheduleService.delete(createdScheduleId);
			expect(deleted.id).toBe(createdScheduleId);

			const user = await ScheduleService.readOne(createdScheduleId);
			expect(user).toBeNull();

			await expect(
				ScheduleService.delete(createdScheduleId)
			).rejects.toThrow();
		});

		it("should not delete a schedule with an invalid id", async () => {
			await expect(ScheduleService.delete(invalidId)).rejects.toThrow();
		});
	});
});
