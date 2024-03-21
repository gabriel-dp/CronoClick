export type Id = string;

export interface Teacher {
	id: Id;
	name: string;
}

export type TeacherDictionary = Record<Id, Teacher>;

export interface Time {
	days: number;
	start: number;
	end: number;
}

export interface Subject {
	id: Id;
	name: string;
	color: string;
	times: Time[];
	teachers: string[];
}

export interface Class
	extends Omit<Subject, "times">,
		Pick<Time, "start" | "end"> {}

export interface Schedule {
	id: Id;
	name: string;
	subjects: Subject[];
}

export interface DayClasses {
	day: string;
	items: Class[];
}
