import z from "zod";

export const configsSchema = z.object({
	weekends: z.boolean(),
	firstDayWeek: z.coerce.number(),
	minimizeTimeSpan: z.boolean(),
	timeInterval: z.coerce.number()
});
export type ConfigsSchema = z.infer<typeof configsSchema>;
