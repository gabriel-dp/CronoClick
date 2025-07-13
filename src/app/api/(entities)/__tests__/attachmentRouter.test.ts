import path from "path";
import fs from "fs";
import { readFile } from "fs/promises";
import FormData from "form-data";

import prisma from "@/lib/prisma";
import {
	api,
	expectRequestFail,
	expectRequestSuccess,
	invalidId
} from "@/utils/testUtils";
import {
	testSubject,
	testTask,
	testUser
} from "@/services/__tests__/__utils__";

describe("/attachments/", () => {
	let userId: string;
	let scheduleId: string;
	let subjectId: string;
	let taskId: string;
	let attachmentId: string;

	const originalFilePath = path.resolve(
		__dirname,
		"__files__/",
		"example3MB-.pdf"
	);
	const invalidFilePath = path.resolve(
		__dirname,
		"__files__/",
		"example3MB+.pdf"
	);
	let originalBuffer: Buffer;

	beforeAll(async () => {
		const user = await prisma.user.create({ data: testUser() });
		userId = user.id;

		const schedule = await prisma.schedule.create({
			data: { name: "Cronograma Teste", userId }
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

		originalBuffer = await readFile(originalFilePath);
	});

	afterAll(async () => {
		await prisma.user.delete({ where: { id: userId } });
	});

	describe("POST", () => {
		it("should upload an attachment - 201", async () => {
			const fileStream = fs.createReadStream(originalFilePath);
			const form = new FormData();
			form.append("file", fileStream);

			const response = await expectRequestSuccess(201, () =>
				api.post(`/attachments/fromTask/${taskId}`, form, {
					headers: {
						...form.getHeaders() // include multipart headers
					},
					maxContentLength: Infinity,
					maxBodyLength: Infinity
				})
			);

			expect(response?.data).toHaveProperty("id");
			expect(response?.data).toHaveProperty(
				"filename",
				originalFilePath.split("/").pop()
			);

			attachmentId = response?.data.id;
		});

		it("should not upload attachment with invalid data - 400", async () => {
			await expectRequestFail(
				400,
				() => api.post(`/attachments/fromTask/${taskId}`) // no file
			);
		});

		it("should not upload an attachment with more that 3MB - 413", async () => {
			const fileStream = fs.createReadStream(invalidFilePath);
			const form = new FormData();
			form.append("file", fileStream);
			await expectRequestFail(413, () =>
				api.post(`/attachments/fromTask/${taskId}`, form, {
					headers: {
						...form.getHeaders()
					},
					maxContentLength: Infinity,
					maxBodyLength: Infinity
				})
			);
		});

		it("should upload two more attachments - 201", async () => {
			for (let i = 0; i < 2; i++) {
				const fileStream = fs.createReadStream(originalFilePath);
				const form = new FormData();
				form.append("file", fileStream, `example-${i}.pdf`);
				const response = await expectRequestSuccess(201, () =>
					api.post(`/attachments/fromTask/${taskId}`, form, {
						headers: {
							...form.getHeaders()
						},
						maxContentLength: Infinity,
						maxBodyLength: Infinity
					})
				);

				expect(response?.data).toHaveProperty("id");
				expect(response?.data).toHaveProperty(
					"filename",
					`example-${i}.pdf`
				);
			}
		});

		it("should not upload more than 3 files by task - 409", async () => {
			const fileStream = fs.createReadStream(originalFilePath);
			const form = new FormData();
			form.append("file", fileStream, "example.pdf");
			await expectRequestFail(409, () =>
				api.post(`/attachments/fromTask/${taskId}`, form, {
					headers: {
						...form.getHeaders()
					},
					maxContentLength: Infinity,
					maxBodyLength: Infinity
				})
			);
		});
	});

	describe("GET", () => {
		it("should download an attachment by ID - 200", async () => {
			const response = await api.get(`/attachments/${attachmentId}`, {
				responseType: "arraybuffer"
			});

			expect(response.status).toBe(200);
			expect(response.headers["content-disposition"]).toMatch(
				/attachment; filename=".*"/
			);
			expect(response.headers["content-type"]).toMatch(/application\/.*/);
			expect(response.data).toBeInstanceOf(Buffer);

			const downloadedBuffer = Buffer.from(response.data);
			expect(downloadedBuffer.equals(originalBuffer)).toBe(true);
		});

		it("should not download attachment with invalid ID - 404", async () => {
			await expectRequestFail(404, () =>
				api.get(`/attachments/${invalidId}/download`)
			);
		});

		it("should list all attachments from a task - 200", async () => {
			const response = await expectRequestSuccess(200, () =>
				api.get(`/attachments/fromTask/${taskId}`)
			);

			expect(Array.isArray(response?.data)).toBe(true);
			expect(response?.data.length).toBe(3);
			expect(response?.data[0]).toHaveProperty("id", attachmentId);
			expect(response?.data[0]).toHaveProperty("filename");
		});
	});

	describe("DELETE", () => {
		it("should delete an attachment - 204", async () => {
			const response = await expectRequestSuccess(204, () =>
				api.delete(`/attachments/${attachmentId}`)
			);
			expect(response?.data).toBe("");

			await expectRequestFail(404, () =>
				api.delete(`/attachments/${attachmentId}`)
			);
		});

		it("should not delete attachment with invalid ID - 404", async () => {
			await expectRequestFail(404, () =>
				api.delete(`/attachments/${invalidId}`)
			);
		});
	});
});
