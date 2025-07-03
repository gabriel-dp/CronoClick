import {
	api,
	expectRequestFail,
	expectRequestSuccess
} from "@/utils/testUtils";

describe("/users/", () => {
	//let createdId: string;
	const userData = {
		username: "a",
		email: "a@a.aa",
		password: "12345678"
	};

	describe("POST", () => {
		it("should create a user - 201", async () => {
			const response = await expectRequestSuccess(201, () =>
				api.post("/users", userData)
			);

			expect(response?.status).toBe(201);
			expect(response?.data).toHaveProperty("id");
			expect(response?.data.username).toBe(userData.username);
			expect(response?.data.email).toBe(userData.email);
			expect(response?.data.password).not.toBe(userData.password);

			//createdId = response?.data.id;
		});

		it("should not create a user - 400", async () => {
			await expectRequestFail(400, () =>
				api.post("/users", {
					username: "",
					email: "a@a.aa",
					password: "12345678"
				})
			);
			await expectRequestFail(400, () =>
				api.post("/users", {
					username: "a",
					email: "",
					password: "12345678"
				})
			);
			await expectRequestFail(400, () =>
				api.post("/users", {
					username: "a",
					email: "a@a.aa",
					password: ""
				})
			);
			await expectRequestFail(400, () =>
				api.post("/users", {
					username: "a",
					email: "@",
					password: "12345678"
				})
			);
			await expectRequestFail(400, () =>
				api.post("/users", {
					username: "a",
					email: "a@a.aa",
					password: "1234567"
				})
			);
		});
	});
});
