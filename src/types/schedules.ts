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
	submission: string;
	finished: boolean;
	notes: Note[];
}

export interface Note {
	id: Id;
	description: string;
}

export type SubjectTask = Task & { subjectId: Id };

export type SubjectTaskNote = Note & { taskId: Id; subjectId: Id };
