import ScheduleService from "@/services/scheduleService";
import { fail, response, success } from "@/utils/response";
import { scheduleSchema, validateFields } from "@/utils/validations";

type paramsRequest = { params: { scheduleId: string } };

export const GET = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const foundSchedule = await ScheduleService.readOne(params.scheduleId);
		if (!foundSchedule) return fail(404);
		return success(foundSchedule);
	});

export const PUT = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const data = validateFields(await request.json(), scheduleSchema);
		const updatedSchedule = await ScheduleService.update(
			params.scheduleId,
			data
		);
		return success(updatedSchedule, 201);
	});

export const DELETE = (request: Request, { params }: paramsRequest) =>
	response(async () => {
		const deletedSchedule = await ScheduleService.delete(params.scheduleId);
		return success(deletedSchedule);
	});
