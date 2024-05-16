import z from "zod";

export const configsSchema = z.object({
	weekends: z.boolean(),
	firstDayWeek: z.string(),
	minimizeTimeSpan: z.boolean(),
	timeInterval: z.string()
});
export type ConfigsSchema = z.infer<typeof configsSchema>;
