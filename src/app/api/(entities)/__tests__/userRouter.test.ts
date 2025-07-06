import {
	api,
	expectRequestFail,
	expectRequestSuccess,
	invalidId
} from "@/utils/testUtils";

describe("/users/", () => {
	let createdId: string;
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
			expect(response?.data).not.toHaveProperty("password");

			createdId = response?.data.id;
		});

		it("should not create a user - 400", async () => {
			await expectRequestFail(400, () =>
				// no username
				api.post("/users", {
					username: "",
					email: "a@a.aa",
					password: "12345678"
				})
			);
			await expectRequestFail(400, () =>
				// no email
				api.post("/users", {
					username: "a",
					email: "",
					password: "12345678"
				})
			);
			await expectRequestFail(400, () =>
				//no password
				api.post("/users", {
					username: "a",
					email: "a@a.aa",
					password: ""
				})
			);
			await expectRequestFail(400, () =>
				// invalid email
				api.post("/users", {
					username: "a",
					email: "@",
					password: "12345678"
				})
			);
			await expectRequestFail(400, () =>
				// invalid password size
				api.post("/users", {
					username: "a",
					email: "a@a.aa",
					password: "1234567"
				})
			);
		});

		it("should not create a user with repeated username or email - 409", async () => {
			await expectRequestFail(409, () =>
				// repeated username
				api.post("/users", {
					username: userData.username,
					email: userData.email + "a",
					password: userData.password
				})
			);
			await expectRequestFail(409, () =>
				// repeated email
				api.post("/users", {
					username: userData.username + "a",
					email: userData.email,
					password: userData.password
				})
			);
		});
	});

	describe("GET", () => {
		it("should fetch a user by ID - 200", async () => {
			const response = await expectRequestSuccess(200, () =>
				api.get(`/users/${createdId}`)
			);

			expect(response?.data).toHaveProperty("id", createdId);
			expect(response?.data.username).toBe(userData.username);
			expect(response?.data.email).toBe(userData.email);
			expect(response?.data).not.toHaveProperty("password");
		});

		it("should return 404 for invalid user ID - 404", async () => {
			await expectRequestFail(404, () => api.get(`/users/${invalidId}`));
		});

		it("should get list of all users - 200", async () => {
			const response = await expectRequestSuccess(200, () =>
				api.get(`/users`)
			);

			expect(Array.isArray(response?.data)).toBe(true);
			response?.data.forEach((user: object) => {
				expect(user).not.toHaveProperty("password");
			});
		});
	});

	describe("PUT", () => {
		it("should update a user by ID - 201", async () => {
			const updatedData = {
				username: "updatedUser",
				email: "updated@email.com",
				password: "87654321"
			};

			const response = await expectRequestSuccess(201, () =>
				api.put(`/users/${createdId}`, updatedData)
			);

			expect(response?.data).toHaveProperty("id", createdId);
			expect(response?.data.username).toBe(updatedData.username);
			expect(response?.data.email).toBe(updatedData.email);
			expect(response?.data).not.toHaveProperty("password");
		});

		it("should not update with invalid data - 400", async () => {
			await expectRequestFail(400, () =>
				api.put(`/users/${createdId}`, {})
			);
		});

		it("should not update non-existent user - 404", async () => {
			await expectRequestFail(404, () =>
				api.put(`/users/${invalidId}`, userData)
			);
		});
	});

	describe("DELETE", () => {
		it("should delete a user by ID - 204", async () => {
			const response = await expectRequestSuccess(204, () =>
				api.delete(`/users/${createdId}`)
			);
			expect(response?.data).toBe("");

			await expectRequestFail(404, () =>
				api.delete(`/users/${createdId}`)
			);
		});

		it("should not delete a user with invalid ID - 404", async () => {
			await expectRequestFail(404, () =>
				api.delete(`/users/${invalidId}`)
			);
		});
	});
});
