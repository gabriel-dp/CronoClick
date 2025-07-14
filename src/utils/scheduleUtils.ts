import {
	Id,
	Schedule,
	Subject,
	SubjectTask,
	SubjectTaskAttachment,
	SubjectTaskNote
} from "@/types/schedules";

export interface ScheduleControlI {
	editName: (newName: string) => void;
	getAllSubjects: () => Subject[];
	getSubject: (id: Id) => Subject | undefined;
	addSubject: (newSubject: Subject) => void;
	removeSubject: (id: Id) => void;
	editSubject: (newSubject: Subject) => void;
	getTask: (subjectId: Id, taskId: Id) => SubjectTask | undefined;
	addTask: (newTask: SubjectTask) => void;
	removeTask: (oldTask: SubjectTask) => void;
	editTask: (oldTask: SubjectTask, newTask: SubjectTask) => void;
	toggleFinished: (subjectId: Id, taskId: Id) => void;
	addNote: (newNote: SubjectTaskNote) => void;
	editNote: (newNote: SubjectTaskNote) => void;
	removeNote: (oldNote: SubjectTaskNote) => void;
	addAttachment: (
		newAttachment: SubjectTaskAttachment,
		data: FormData
	) => void;
	removeAttachment: (oldAttachment: SubjectTaskAttachment) => void;
}

interface controlScheduleReturn extends ScheduleControlI {
	schedule: Schedule;
}

export function controlSchedule(
	schedule: Schedule,
	setSchedule: React.Dispatch<React.SetStateAction<Schedule>>
): controlScheduleReturn {
	const editName = (newName: string): void =>
		setSchedule((prev) => ({
			...prev,
			name: newName
		}));

	const getAllSubjects = (): Subject[] => {
		return schedule.subjects;
	};

	const getSubject = (id: Id): Subject | undefined => {
		return schedule.subjects.find((subject) => subject.id == id);
	};

	const addSubject = (newSubject: Subject): void =>
		setSchedule((prev) => ({
			...prev,
			subjects: [...prev.subjects, { ...newSubject }]
		}));

	const removeSubject = (id: Id): void =>
		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.filter((subject) => subject.id != id)
		}));

	const editSubject = (newSubject: Subject): void =>
		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.map((subject) => {
				if (subject.id == newSubject.id) return { ...newSubject };
				return subject;
			})
		}));

	const getTask = (subjectId: Id, taskId: Id): SubjectTask | undefined => {
		const taskFound = getSubject(subjectId)?.tasks.find(
			(task) => task.id == taskId
		);

		if (!taskFound) return undefined;
		return {
			subjectId,
			...taskFound
		};
	};

	const addTask = (newTask: SubjectTask) =>
		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.map((subject) => {
				if (subject.id == newTask.subjectId)
					return {
						...subject,
						tasks: [...subject.tasks, { ...newTask }]
					};
				return subject;
			})
		}));

	const removeTask = (oldTask: SubjectTask) =>
		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.map((subject) => {
				if (subject.id == oldTask.subjectId)
					return {
						...subject,
						tasks: subject.tasks.filter(
							(task) => task.id != oldTask.id
						)
					};
				return subject;
			})
		}));

	const editTask = (oldTask: SubjectTask, newTask: SubjectTask) => {
		// Changes subject from task
		if (oldTask.subjectId != newTask.subjectId) {
			removeTask(oldTask);
			addTask(newTask);
			return;
		}

		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.map((subject) => {
				if (subject.id == newTask.subjectId)
					return {
						...subject,
						tasks: subject.tasks.map((task) => {
							if (task.id == newTask.id) return { ...newTask };
							return task;
						})
					};
				return subject;
			})
		}));
	};

	const toggleFinished = (subjectId: Id, taskId: Id) => {
		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.map((subject) => {
				if (subject.id == subjectId)
					return {
						...subject,
						tasks: subject.tasks.map((task) => {
							if (task.id == taskId)
								return {
									...task,
									finished: !task.finished
								};
							return task;
						})
					};
				return subject;
			})
		}));
	};

	const addNote = (newNote: SubjectTaskNote) => {
		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.map((subject) => {
				if (subject.id == newNote.subjectId)
					return {
						...subject,
						tasks: subject.tasks.map((task) => {
							if (task.id == newNote.taskId)
								return {
									...task,
									notes: [...task.notes, newNote]
								};
							return task;
						})
					};
				return subject;
			})
		}));
	};

	const editNote = (newNote: SubjectTaskNote) => {
		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.map((subject) => {
				if (subject.id == newNote.subjectId)
					return {
						...subject,
						tasks: subject.tasks.map((task) => {
							if (task.id == newNote.taskId) {
								return {
									...task,
									notes: task.notes.map((note) => {
										if (note.id == newNote.id)
											return { ...newNote };
										return note;
									})
								};
							}
							return task;
						})
					};
				return subject;
			})
		}));
	};

	const removeNote = (oldNote: SubjectTaskNote) => {
		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.map((subject) => {
				if (subject.id == oldNote.subjectId)
					return {
						...subject,
						tasks: subject.tasks.map((task) => {
							if (task.id == oldNote.taskId) {
								return {
									...task,
									notes: task.notes.filter(
										(note) => note.id != oldNote.id
									)
								};
							}
							return task;
						})
					};
				return subject;
			})
		}));
	};

	const addAttachment = (newAttachment: SubjectTaskAttachment) => {
		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.map((subject) => {
				if (subject.id == newAttachment.subjectId)
					return {
						...subject,
						tasks: subject.tasks.map((task) => {
							if (task.id == newAttachment.taskId)
								return {
									...task,
									attachments: [
										...task.attachments,
										newAttachment
									]
								};
							return task;
						})
					};
				return subject;
			})
		}));
	};

	const removeAttachment = (oldAttachment: SubjectTaskAttachment) => {
		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.map((subject) => {
				if (subject.id == oldAttachment.subjectId)
					return {
						...subject,
						tasks: subject.tasks.map((task) => {
							if (task.id == oldAttachment.taskId) {
								return {
									...task,
									attachments: task.attachments.filter(
										(note) => note.id != oldAttachment.id
									)
								};
							}
							return task;
						})
					};
				return subject;
			})
		}));
	};

	return {
		schedule,
		editName,
		getAllSubjects,
		getSubject,
		addSubject,
		removeSubject,
		editSubject,
		getTask,
		addTask,
		removeTask,
		editTask,
		toggleFinished,
		addNote,
		editNote,
		removeNote,
		addAttachment,
		removeAttachment
	};
}
