import { compare } from "bcrypt";
import { ObjectId } from "bson";

import prisma from "@/lib/prisma";
import { userType } from "@/utils/validations";

import UserService from "../userService";

jest.setTimeout(30000); // 30 seconds

describe("UserService", () => {
	let createdUserId: string;
	const invalidId: string = new ObjectId().toHexString();

	const testUser: userType = {
		username: "Test User",
		email: "test@example.com",
		password: "securePassword123"
	};

	describe("create", () => {
		it("should create a user with encrypted password and a schedule", async () => {
			const user = await UserService.create(testUser);
			createdUserId = user.id;

			expect(user).toHaveProperty("id");
			expect(user.username).toBe(testUser.username);
			expect(user.email).toBe(testUser.email);
			expect(user.password).not.toBe(testUser.password);

			const passwordMatches = await compare(
				testUser.password,
				user.password
			);
			expect(passwordMatches).toBe(true);

			const schedules = await prisma.schedule.findMany({
				where: { userId: user.id }
			});
			expect(schedules.length).toBe(1);
			expect(schedules[0].name).toBe("Cronograma");
		});

		it("should not create a user with same username or email", async () => {
			const sameUsername = { ...testUser, email: "test2@example.com" };
			await expect(UserService.create(sameUsername)).rejects.toThrow();

			const sameEmail = { ...testUser, username: "Test User" };
			await expect(UserService.create(sameEmail)).rejects.toThrow();
		});
	});

	describe("readOne", () => {
		it("should read a user by id", async () => {
			const user = await UserService.readOne(createdUserId);
			expect(user).not.toBeNull();
			expect(user?.id).toBe(createdUserId);
		});

		it("should not read a user with invalid id", async () => {
			const user = await UserService.readOne(invalidId);
			expect(user).toBeNull();
		});
	});

	describe("readAll", () => {
		it("should read all users, not having the password", async () => {
			const users = await UserService.readAll();
			expect(Array.isArray(users)).toBe(true);
			expect(users.some((user) => user.id === createdUserId)).toBe(true);
			users.forEach((user) => {
				expect(user).not.toHaveProperty("password");
			});
		});
	});

	describe("update", () => {
		it("should update user data", async () => {
			const newData: userType = {
				username: "Updated User",
				email: "test.updated@example.com",
				password: "newPassword456"
			};

			const updated = await UserService.update(createdUserId, newData);
			expect(updated.username).toBe(newData.username);
			expect(updated.email).toBe(newData.email);

			const passwordMatches = await compare(
				newData.password,
				updated.password
			);
			expect(passwordMatches).toBe(true);
		});

		it("should not update a user data with an invalid id", async () => {
			await expect(
				UserService.update(invalidId, testUser)
			).rejects.toThrow();
		});
	});

	describe("delete", () => {
		it("should delete the user just once", async () => {
			const deleted = await UserService.delete(createdUserId);
			expect(deleted.id).toBe(createdUserId);

			const user = await UserService.readOne(createdUserId);
			expect(user).toBeNull();

			await expect(UserService.delete(createdUserId)).rejects.toThrow();
		});

		it("should not delete the user with an invalid id", async () => {
			await expect(UserService.delete(invalidId)).rejects.toThrow();
		});
	});
});
