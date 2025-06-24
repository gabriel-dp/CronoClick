import UserService from "@/services/userService";
import { fail, response, success } from "@/utils/response";
import { userSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { userId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const founduser = await UserService.readOne(params.userId);
		if (!founduser) return fail(404);
		return success(founduser);
	});

export const PUT = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const data = validateFields(await request.json(), userSchema);
		const updatedUser = await UserService.update(params.userId, data);
		return success(updatedUser);
	});

export const DELETE = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const deletedUser = await UserService.delete(params.userId);
		return success(deletedUser);
	});
