import UserService from "@/services/userService";
import { fail, response, success } from "@/utils/response";
import { userSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { userId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const foundUser = await UserService.readOne(params.userId);
		if (!foundUser) return fail(404);
		return success(foundUser);
	});

export const PUT = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const data = validateFields(await request.json(), userSchema);
		const updatedUser = await UserService.update(params.userId, data);
		return success(updatedUser, 201);
	});

export const DELETE = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		await UserService.delete(params.userId);
		return success({}, 204);
	});
