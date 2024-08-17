export type Id = string;

export interface Schedule {
	id: Id;
	name: string;
	subjects: Subject[];
}

export interface Subject {
	id: Id;
	name: string;
	color: string;
	teacher: string;
	times: Time[];
	tasks: Task[];
}

export interface Time {
	days: number;
	start: number;
	duration: number;
}

export interface Task {
	id: Id;
	name: string;
	description: string;
	submission: string;
	finished: boolean;
}

export interface Note {
	id: Id;
	description: string;
}

export type SubjectTask = Task & { subjectId: Id };
