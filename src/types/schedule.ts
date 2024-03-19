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
	times: Time[];
	teachersId: Id[];
}

export interface Class
	extends Omit<Subject, "times">,
		Pick<Time, "start" | "end"> {}

export interface Schedule {
	id: Id;
	name: string;
	subjects: Subject[];
}
