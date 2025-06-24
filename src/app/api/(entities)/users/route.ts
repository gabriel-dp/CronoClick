import UserService from "@/services/userService";
import { response, success } from "@/utils/response";
import { userSchema, validateFields } from "@/utils/validations";

export const GET = () =>
	response(async () => {
		const allUsers = await UserService.readAll();
		return success(allUsers);
	});

export const POST = (request: Request) =>
	response(async () => {
		const data = validateFields(await request.json(), userSchema);
		const newUser = await UserService.create(data);
		return success(newUser, 201);
	});
