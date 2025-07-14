import prisma from "@/lib/prisma";
import {
	api,
	expectRequestFail,
	expectRequestSuccess,
	invalidId
} from "@/utils/testUtils";
import { testSchedule, testUser } from "@/services/__tests__/__utils__";

describe("/subjects/", () => {
	let userId: string;
	let scheduleId: string;
	let subjectId: string;

	const subjectData = {
		name: "Matemática",
		teacher: "Prof. João",
		color: "#000000",
		times: [
			{
				days: 5,
				duration: 120,
				start: 0
			}
		]
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
	});

	afterAll(async () => {
		await prisma.user.delete({ where: { id: userId } });
	});

	describe("POST", () => {
		it("should create a subject for a schedule - 201", async () => {
			const response = await expectRequestSuccess(201, () =>
				api.post(`/subjects/fromSchedule/${scheduleId}`, subjectData)
			);

			expect(response?.status).toBe(201);
			expect(response?.data).toHaveProperty("id");
			expect(response?.data.name).toBe(subjectData.name);
			expect(response?.data.color).toBe(subjectData.color);
			expect(response?.data.teacher).toBe(subjectData.teacher);
			expect(Array.isArray(response?.data.times)).toBe(true);
			expect(response?.data.times.length).toBe(1);
			response?.data.times.forEach(
				(time: { duration: number; start: number; days: number }) => {
					expect(time.duration).toBe(subjectData.times[0].duration);
					expect(time.days).toBe(subjectData.times[0].days);
					expect(time.start).toBe(subjectData.times[0].start);
				}
			);

			subjectId = response?.data.id;
		});

		it("should not create a subject with invalid data - 400", async () => {
			await expectRequestFail(400, () =>
				api.post(`/subjects/fromSchedule/${scheduleId}`, {
					...subjectData,
					name: "" // invalid name
				})
			);
			await expectRequestFail(400, () =>
				api.post(`/subjects/fromSchedule/${scheduleId}`, {
					...subjectData,
					name: "a".repeat(101) // invalid name length
				})
			);
			await expectRequestFail(400, () =>
				api.post(`/subjects/fromSchedule/${scheduleId}`, {
					...subjectData,
					color: "red" // invalid color pattern
				})
			);
			await expectRequestFail(400, () =>
				api.post(`/subjects/fromSchedule/${scheduleId}`, {
					...subjectData,
					times: [] // no times
				})
			);
			await expectRequestFail(400, () =>
				api.post(`/subjects/fromSchedule/${scheduleId}`, {
					...subjectData,
					times: [{ duration: 0, start: 0, days: 1 }] // invalid time duration
				})
			);
			await expectRequestFail(400, () =>
				api.post(`/subjects/fromSchedule/${scheduleId}`, {
					...subjectData,
					times: [{ duration: 1, start: -1, days: 1 }] // invalid time start
				})
			);
			await expectRequestFail(400, () =>
				api.post(`/subjects/fromSchedule/${scheduleId}`, {
					...subjectData,
					times: [{ duration: 1, start: 0, days: 0 }] // invalid time days
				})
			);
			await expectRequestFail(400, () =>
				api.post(`/subjects/fromSchedule/${scheduleId}`, {
					...subjectData,
					times: [{ duration: 1, start: 0, days: 128 }] // invalid time days
				})
			);
			await expectRequestFail(404, () =>
				api.post(
					`/subjects/fromSchedule/${invalidId}`, // invalid scheule id
					subjectData
				)
			);
		});
	});

	describe("GET", () => {
		it("should fetch a subject by ID - 200", async () => {
			const response = await expectRequestSuccess(200, () =>
				api.get(`/subjects/${subjectId}`)
			);

			expect(response?.data).toHaveProperty("id", subjectId);
			expect(response?.data.name).toBe(subjectData.name);
		});

		it("should not fetch a subject with invalid ID - 404", async () => {
			await expectRequestFail(404, () =>
				api.get(`/subjects/${invalidId}`)
			);
		});

		it("should fetch all subjects from a schedule - 200", async () => {
			const response = await expectRequestSuccess(200, () =>
				api.get(`/subjects/fromSchedule/${scheduleId}`)
			);

			expect(Array.isArray(response?.data)).toBe(true);
			expect(response?.data.length).toBe(1);
			expect(response?.data[0].id).toBe(subjectId);
		});
	});

	describe("PUT", () => {
		it("should update a subject - 201", async () => {
			const updatedData = {
				name: "Português",
				teacher: "Prof. João",
				color: "#FFFFFF",
				times: [
					{
						days: 25,
						duration: 60,
						start: 120
					}
				]
			};

			const response = await expectRequestSuccess(201, () =>
				api.put(`/subjects/${subjectId}`, updatedData)
			);

			expect(response?.status).toBe(201);
			expect(response?.data.id).toBe(subjectId);
			expect(response?.data.name).toBe(updatedData.name);
			expect(response?.data.color).toBe(updatedData.color);
			expect(response?.data.teacher).toBe(updatedData.teacher);
			expect(Array.isArray(response?.data.times)).toBe(true);
			expect(response?.data.times.length).toBe(1);
			response?.data.times.forEach(
				(time: { duration: number; start: number; days: number }) => {
					expect(time.duration).toBe(updatedData.times[0].duration);
					expect(time.days).toBe(updatedData.times[0].days);
					expect(time.start).toBe(updatedData.times[0].start);
				}
			);
		});

		it("should not update a subject with invalid ID - 404", async () => {
			await expectRequestFail(404, () =>
				api.put(`/subjects/${invalidId}`, subjectData)
			);
		});
	});

	describe("DELETE", () => {
		it("should delete a subject by ID - 204", async () => {
			const response = await expectRequestSuccess(204, () =>
				api.delete(`/subjects/${subjectId}`)
			);
			expect(response?.data).toBe("");

			await expectRequestFail(404, () =>
				api.delete(`/subjects/${subjectId}`)
			);
		});

		it("should not delete a subject with invalid ID - 404", async () => {
			await expectRequestFail(404, () =>
				api.delete(`/subjects/${invalidId}`)
			);
		});
	});
});
