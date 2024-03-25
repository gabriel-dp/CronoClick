import { Subject, Time } from "@/types/schedules";

export interface Class
	extends Pick<Subject, "id" | "name" | "teacher" | "color">,
		Pick<Time, "start" | "duration"> {}

export interface DayClasses {
	day: string;
	items: Class[];
}
