import prisma from "@/lib/prisma";
import {
	api,
	expectRequestFail,
	expectRequestSuccess,
	invalidId
} from "@/utils/testUtils";
import { testUser } from "@/services/__tests__/__utils__";

describe("/schedules/", () => {
	let userId: string;
	let createdScheduleId: string;
	const scheduleData = {
		name: "Meu Cronograma"
	};

	beforeAll(async () => {
		const user = await prisma.user.create({ data: testUser() });
		userId = user.id;
	});

	afterAll(async () => {
		await prisma.user.delete({ where: { id: userId } });
	});

	describe("POST", () => {
		it("should create a schedule - 201", async () => {
			const response = await expectRequestSuccess(201, () =>
				api.post(`/schedules/fromUser/${userId}`, scheduleData)
			);

			expect(response?.status).toBe(201);
			expect(response?.data).toHaveProperty("id");
			expect(response?.data.name).toBe(scheduleData.name);

			createdScheduleId = response?.data.id;
		});

		it("should not create a schedule with invalid data - 400", async () => {
			await expectRequestFail(400, () =>
				api.post(`/schedules/fromUser/${userId}`, {
					name: "" // invalid name
				})
			);
			await expectRequestFail(400, () =>
				api.post(`/schedules/fromUser/${userId}`, {
					name: "a".repeat(101) // invalid name length
				})
			);
			await expectRequestFail(404, () =>
				api.post(
					`/schedules/fromUser/${invalidId}`, // invalid user id
					{
						name: "Nome"
					}
				)
			);
		});
	});

	describe("GET", () => {
		it("should fetch a schedule by ID - 200", async () => {
			const response = await expectRequestSuccess(200, () =>
				api.get(`/schedules/${createdScheduleId}`)
			);

			expect(response?.data).toHaveProperty("id", createdScheduleId);
			expect(response?.data).toHaveProperty("name", scheduleData.name);
			expect(response?.data).toHaveProperty("subjects");
			expect(Array.isArray(response?.data?.subjects)).toBe(true);
			expect(response?.data?.subjects.length).toBe(0);
		});

		it("should not fetch a schedule with invalid ID - 404", async () => {
			await expectRequestFail(404, () =>
				api.get(`/schedules/${invalidId}`)
			);
		});

		it("should fetch a list with all schedules from user - 200", async () => {
			const response = await expectRequestSuccess(200, () =>
				api.get(`/schedules/fromUser/${userId}`)
			);

			expect(Array.isArray(response?.data)).toBe(true);
			expect(response?.data.length).toBe(1);
			expect(response?.data[0].id).toBe(createdScheduleId);
			expect(response?.data[0]).not.toHaveProperty("subjects");
		});
	});

	describe("PUT", () => {
		it("should update schedule with valid data - 201", async () => {
			const updatedData = {
				name: "Atualizado"
			};

			const response = await expectRequestSuccess(201, () =>
				api.put(`/schedules/${createdScheduleId}`, updatedData)
			);

			expect(response?.data).toHaveProperty("id", createdScheduleId);
			expect(response?.data.name).toBe(updatedData.name);
		});

		it("should not update schedule with invalid data - 400", async () => {
			await expectRequestFail(
				400,
				() => api.put(`/schedules/${createdScheduleId}`, { name: "" }) // invalid name
			);

			await expectRequestFail(400, () =>
				api.put(`/schedules/${createdScheduleId}`, {
					name: "a".repeat(101) // invalid name
				})
			);
		});

		it("should not update a schedule with invalid id - 404", async () => {
			await expectRequestFail(404, () =>
				api.put(`/schedules/${invalidId}`, scheduleData)
			);
		});
	});

	describe("DELETE", () => {
		it("should delete a schedule - 204", async () => {
			const response = await expectRequestSuccess(204, () =>
				api.delete(`/schedules/${createdScheduleId}`)
			);
			expect(response?.data).toBe("");

			await expectRequestFail(404, () =>
				api.delete(`/schedules/${createdScheduleId}`)
			);
		});

		it("should not delete a schedule with invalid ID - 404", async () => {
			await expectRequestFail(404, () =>
				api.delete(`/schedules/${invalidId}`)
			);
		});
	});
});
