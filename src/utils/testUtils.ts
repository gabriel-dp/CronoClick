import axios, { AxiosError, AxiosResponse } from "axios";
import { ObjectId } from "bson";

export const api = axios.create({
	baseURL: process.env.NEXTAUTH_URL + "/api",
	headers: {
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY ?? ""}`
	}
});

export function fail(message: string) {
	throw new Error(message);
}

export async function expectRequestSuccess(
	status: number,
	func: () => Promise<AxiosResponse>
) {
	try {
		const response = await func();
		expect(response.status).toBe(status);
		return response;
	} catch (error) {
		fail(
			`should success, expect ${status}, got ${(error as AxiosError).response?.status ?? "???"}`
		);
	}
}

export async function expectRequestFail(
	status: number,
	func: () => Promise<AxiosResponse>
) {
	let response;
	try {
		response = await func();
		fail("should fail");
	} catch (error) {
		expect((error as AxiosError).response?.status ?? response?.status).toBe(
			status
		);
	}
}

export const invalidId: string = new ObjectId().toHexString();
