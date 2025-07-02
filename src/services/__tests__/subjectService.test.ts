import prisma from "@/lib/prisma";

import SubjectService from "../subjectService";
import { testUser, testSchedule, testSubject, invalidId } from "./__utils__";

describe("SubjectService", () => {
	let userId: string;
	let scheduleId: string;
	let createdSubjectId: string;
	const subjectData = testSubject();

	beforeAll(async () => {
		const user = await prisma.user.create({ data: testUser() });
		userId = user.id;
		const schedule = await prisma.schedule.create({
			data: { ...testSchedule(), userId }
		});
		scheduleId = schedule.id;
	});

	afterAll(async () => {
		await prisma.user.delete({ where: { id: userId } });
	});

	describe("create", () => {
		it("should create a subject with the respective times", async () => {
			const subject = await SubjectService.create(
				subjectData,
				scheduleId
			);
			createdSubjectId = subject.id;

			expect(subject).toHaveProperty("id");
			expect(subject.name).toBe(subjectData.name);
			expect(subject.color).toBe(subjectData.color);
			expect(subject.teacher).toBe(subjectData.teacher);
			expect(subject.scheduleId).toBe(scheduleId);
			expect(Array.isArray(subject.times)).toBe(true);
			expect(subject.times.length).toBe(subjectData.times.length);
			expect(subject.times).toEqual(
				expect.arrayContaining(subjectData.times)
			);
			expect(subjectData.times).toEqual(
				expect.arrayContaining(subject.times)
			);

			const subjects = await prisma.subject.findMany({
				where: { scheduleId }
			});
			expect(subjects.length).toBe(1);
			expect(subjects[0].id).toBe(subject.id);
		});
	});

	describe("readOne", () => {
		it("should read a subject by id", async () => {
			const subject = await SubjectService.readOne(createdSubjectId);
			expect(subject).not.toBeNull();
			if (subject) {
				expect(subject.id).toBe(createdSubjectId);
				expect(subject.name).toBe(subjectData.name);
				expect(subject.color).toBe(subjectData.color);
				expect(subject.teacher).toBe(subjectData.teacher);
				expect(subject.scheduleId).toBe(scheduleId);
			}
		});

		it("should not read a subject with invalid id", async () => {
			const subject = await SubjectService.readOne(invalidId);
			expect(subject).toBeNull();
		});
	});

	describe("readAll", () => {
		it("should read all subjects from schedule", async () => {
			const subjects = await SubjectService.readAllBySchedule(scheduleId);
			expect(Array.isArray(subjects)).toBe(true);
			expect(subjects.some((s) => s.id == createdSubjectId)).toBe(true);
		});
	});

	describe("update", () => {
		it("should update subject data", async () => {
			const newData = testSubject();

			const updated = await SubjectService.update(
				createdSubjectId,
				newData
			);
			expect(updated.id).toBe(createdSubjectId);
			expect(updated.name).toBe(newData.name);
			expect(updated.color).toBe(newData.color);
			expect(updated.teacher).toBe(newData.teacher);
			expect(updated.scheduleId).toBe(scheduleId);
			expect(Array.isArray(updated.times)).toBe(true);
			expect(updated.times.length).toBe(newData.times.length);
			expect(updated.times).toEqual(
				expect.arrayContaining(newData.times)
			);
			expect(newData.times).toEqual(
				expect.arrayContaining(updated.times)
			);
		});

		it("should not update a subject data with an invalid id", async () => {
			await expect(
				SubjectService.update(invalidId, subjectData)
			).rejects.toThrow();
		});
	});

	describe("delete", () => {
		it("should delete a subject just once", async () => {
			const deleted = await SubjectService.delete(createdSubjectId);
			expect(deleted.id).toBe(createdSubjectId);

			const subject = await SubjectService.readOne(createdSubjectId);
			expect(subject).toBeNull();

			await expect(
				SubjectService.delete(createdSubjectId)
			).rejects.toThrow();
		});

		it("should not delete a subject with an invalid id", async () => {
			await expect(SubjectService.delete(invalidId)).rejects.toThrow();
		});
	});
});
