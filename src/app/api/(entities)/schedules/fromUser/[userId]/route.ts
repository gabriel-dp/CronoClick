import ScheduleService from "@/services/scheduleService";
import { response, success } from "@/utils/response";
import { scheduleSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { userId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const allSchedules = await ScheduleService.readAllByUser(params.userId);
		return success(allSchedules);
	});

export const POST = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const data = validateFields(await request.json(), scheduleSchema);
		const newSchedule = await ScheduleService.create(data, params.userId);
		return success(newSchedule, 201);
	});
