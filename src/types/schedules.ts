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
	attachments: Attachment[];
}

export interface Note {
	id: Id;
	description: string;
}

export interface Attachment {
	id: Id;
	filename: string;
}

export type SubjectTask = Task & { subjectId: Id };

export type SubjectTaskNote = Note & { taskId: Id; subjectId: Id };

export type SubjectTaskAttachment = Attachment & { taskId: Id; subjectId: Id };
