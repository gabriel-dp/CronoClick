import { Subject, Time } from "@/types/schedules";

export type SubjectClass = Pick<Subject, "id" | "name" | "teacher" | "color">;

export interface Class extends Pick<Time, "start" | "duration"> {
	subject: SubjectClass;
}

export interface DayClasses {
	day: string;
	items: Class[];
}
