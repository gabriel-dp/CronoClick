"use client";

import { Id, Schedule, Subject, SubjectTask, Task } from "@/types/schedules";
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
		body: Partial<T>
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

	const addSubject = (newSubject: Subject): void => {
		const { id: originalId, ...subjectWithoutId } = newSubject;
		optimisticSafeUpdate<Subject>(
			(newId) =>
				controls.addSubject({
					id: newId ?? originalId,
					...subjectWithoutId
				}),
			`/subjects/fromSchedule/${schedule.id}`,
			"POST",
			{ ...newSubject }
		);
	};

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

	const addTask = (newTask: SubjectTask) => {
		const { id: originalId, ...taskWithoutId } = newTask;
		optimisticSafeUpdate<Task>(
			(newId) =>
				controls.addTask({
					id: newId ?? originalId,
					...taskWithoutId
				}),
			`tasks/fromSubject/${newTask.subjectId}`,
			"POST",
			{ ...newTask }
		);
	};

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
		toggleFinished
	};
}
