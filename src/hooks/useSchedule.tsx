"use client";

import { Id, Schedule, Subject, SubjectTask } from "@/types/schedules";
import { apiRequest, RequestType } from "@/hooks/useApiRequest";

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
}

interface useScheduleReturn extends ScheduleControlI {
	schedule: Schedule;
}

export function useSchedule(
	schedule: Schedule,
	setSchedule: React.Dispatch<React.SetStateAction<Schedule>>
): useScheduleReturn {
	// Default action for all api requests
	function optimisticSafeUpdate<T>(
		updateScheduleState: () => void,
		path: string,
		method: RequestType,
		body: Partial<T>
	) {
		const previousState = { ...schedule };
		updateScheduleState();

		apiRequest<Schedule>(path, method, body, {
			actionError: (message: string) => {
				setSchedule(previousState);
				console.log(message);
			}
		});
	}

	const editName = (newName: string): void =>
		optimisticSafeUpdate<Schedule>(
			() =>
				setSchedule((prev) => ({
					...prev,
					name: newName
				})),
			`/schedules/${schedule.id}`,
			"PUT",
			{
				name: newName
			}
		);

	const getAllSubjects = (): Subject[] => {
		return schedule.subjects;
	};

	const getSubject = (id: Id): Subject | undefined => {
		return schedule.subjects.find((subject) => subject.id == id);
	};

	const addSubject = (newSubject: Subject): void => {
		optimisticSafeUpdate<Subject>(
			() =>
				setSchedule((prev) => ({
					...prev,
					subjects: [...prev.subjects, newSubject]
				})),
			`/subjects/fromSchedule/${schedule.id}`,
			"POST",
			{
				...newSubject
			}
		);
	};

	const removeSubject = (id: Id): void => {
		optimisticSafeUpdate<Subject>(
			() =>
				setSchedule((prev) => ({
					...prev,
					subjects: prev.subjects.filter(
						(subject) => subject.id != id
					)
				})),
			`/subjects/${id}`,
			"DELETE",
			{}
		);
	};

	const editSubject = (newSubject: Subject): void => {
		optimisticSafeUpdate<Subject>(
			() =>
				setSchedule((prev) => ({
					...prev,
					subjects: prev.subjects.map((subject) => {
						if (subject.id == newSubject.id)
							return { ...newSubject };
						return subject;
					})
				})),
			`/subjects/${newSubject.id}`,
			"PUT",
			{
				...newSubject
			}
		);
	};

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
		optimisticSafeUpdate(
			() => {
				setSchedule((prev) => ({
					...prev,
					subjects: prev.subjects.map((subject) => {
						if (subject.id == newTask.subjectId)
							return {
								...subject,
								tasks: [...subject.tasks, newTask]
							};
						return subject;
					})
				}));
			},
			`tasks/fromSubject/${newTask.subjectId}`,
			"POST",
			{ ...newTask }
		);

	const removeTask = (oldTask: SubjectTask) => {
		optimisticSafeUpdate(
			() => {
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
			},
			`tasks/${oldTask.id}`,
			"DELETE",
			{}
		);
	};

	const editTask = (oldTask: SubjectTask, newTask: SubjectTask) => {
		// Changes subject from task
		if (oldTask.subjectId != newTask.subjectId) {
			removeTask(oldTask);
			addTask(newTask);
			return;
		}

		optimisticSafeUpdate(
			() => {
				setSchedule((prev) => ({
					...prev,
					subjects: prev.subjects.map((subject) => {
						if (subject.id == newTask.subjectId)
							return {
								...subject,
								tasks: subject.tasks.map((task) => {
									if (task.id == newTask.id)
										return { ...newTask };
									return task;
								})
							};
						return subject;
					})
				}));
			},
			`tasks/${newTask.id}`,
			"PUT",
			{ ...newTask }
		);
	};

	const toggleFinished = (subjectId: Id, taskId: Id) => {
		const task = getTask(subjectId, taskId);
		if (!task) return;

		const { finished, ...taskData } = task;

		optimisticSafeUpdate(
			() => {
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
			},
			`tasks/${taskId}`,
			"PUT",
			{ finished: !finished, ...taskData }
		);
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
		toggleFinished
	};
}
