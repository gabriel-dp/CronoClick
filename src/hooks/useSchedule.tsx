"use client";

import {
	Attachment,
	Id,
	Note,
	Schedule,
	Subject,
	SubjectTask,
	SubjectTaskAttachment,
	SubjectTaskNote,
	Task
} from "@/types/schedules";
import { apiRequest, RequestType } from "@/hooks/useApiRequest";
import { controlSchedule, ScheduleControlI } from "@/utils/scheduleUtils";

export function useSchedule(
	schedule: Schedule,
	setSchedule: React.Dispatch<React.SetStateAction<Schedule>>
): ScheduleControlI {
	const controls = controlSchedule(schedule, setSchedule);

	// Action for all api requests
	function optimisticSafeUpdate<T extends { id: Id }>(
		updateScheduleState: (newId?: Id) => void,
		path: string,
		method: RequestType,
		body: Partial<T> | FormData
	) {
		const previousState = { ...schedule };
		updateScheduleState();

		apiRequest<T, T>(path, method, body, {
			actionError: (message: string) => {
				setSchedule(previousState);
				console.log(message);
			},
			actionResponse: (data: T) => {
				setSchedule(previousState);
				updateScheduleState(data.id);
			}
		});
	}

	const editName = (newName: string): void =>
		optimisticSafeUpdate<Schedule>(
			() => controls.editName(newName),
			`/schedules/${schedule.id}`,
			"PUT",
			{ name: newName }
		);

	const addSubject = (newSubject: Subject): void =>
		optimisticSafeUpdate<Subject>(
			(newId) =>
				controls.addSubject({
					...newSubject,
					id: newId ?? newSubject.id
				}),
			`/subjects/fromSchedule/${schedule.id}`,
			"POST",
			{ ...newSubject }
		);

	const removeSubject = (id: Id): void => {
		optimisticSafeUpdate<Subject>(
			() => controls.removeSubject(id),
			`/subjects/${id}`,
			"DELETE",
			{}
		);
	};

	const editSubject = (newSubject: Subject): void => {
		optimisticSafeUpdate<Subject>(
			() => controls.editSubject(newSubject),
			`/subjects/${newSubject.id}`,
			"PUT",
			{ ...newSubject }
		);
	};

	const addTask = (newTask: SubjectTask) =>
		optimisticSafeUpdate<Task>(
			(newId) =>
				controls.addTask({ ...newTask, id: newId ?? newTask.id }),
			`tasks/fromSubject/${newTask.subjectId}`,
			"POST",
			{ ...newTask }
		);

	const removeTask = (oldTask: SubjectTask) => {
		optimisticSafeUpdate<Task>(
			() => controls.removeTask(oldTask),
			`tasks/${oldTask.id}`,
			"DELETE",
			{}
		);
	};

	const editTask = (oldTask: SubjectTask, newTask: SubjectTask) =>
		optimisticSafeUpdate<Task>(
			() => controls.editTask(oldTask, newTask),
			`tasks/${newTask.id}`,
			"PUT",
			{ ...newTask }
		);

	const toggleFinished = (subjectId: Id, taskId: Id) => {
		const task = controls.getTask(subjectId, taskId);
		if (!task) return;

		const { finished, ...taskData } = task;
		optimisticSafeUpdate<Task>(
			() => controls.toggleFinished(subjectId, taskId),
			`tasks/${taskId}`,
			"PUT",
			{ finished: !finished, ...taskData }
		);
	};

	const addNote = (newNote: SubjectTaskNote) =>
		optimisticSafeUpdate<Note>(
			(newId) =>
				controls.addNote({ ...newNote, id: newId ?? newNote.id }),
			`notes/fromTask/${newNote.taskId}`,
			"POST",
			{ ...newNote }
		);

	const editNote = (newNote: SubjectTaskNote) =>
		optimisticSafeUpdate<Note>(
			() => controls.editNote(newNote),
			`notes/${newNote.id}`,
			"PUT",
			{ ...newNote }
		);

	const removeNote = (oldNote: SubjectTaskNote) => {
		optimisticSafeUpdate<Note>(
			() => controls.removeNote(oldNote),
			`notes/${oldNote.id}`,
			"DELETE",
			{}
		);
	};

	const addAttachment = (
		newAttachment: FormData,
		data: { id: Id; taskId: Id; subjectId: Id }
	) => {
		optimisticSafeUpdate<Attachment>(
			(newId) =>
				controls.addAttachment(newAttachment, {
					...data,
					id: newId ?? data.id
				}),
			`attachments/fromTask/${data.taskId}`,
			"POST",
			newAttachment
		);
	};

	const removeAttachment = (oldAttachment: SubjectTaskAttachment) =>
		optimisticSafeUpdate<Attachment>(
			() => controls.removeAttachment(oldAttachment),
			`attachments/${oldAttachment.id}`,
			"DELETE",
			{}
		);

	return {
		editName,
		getAllSubjects: controls.getAllSubjects,
		getSubject: controls.getSubject,
		addSubject,
		removeSubject,
		editSubject,
		getTask: controls.getTask,
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
