"use client";

import { useState } from "react";

import { Id, Schedule, Subject, SubjectTask } from "@/types/schedules";

export interface ScheduleControlI {
	getSubject: (id: Id) => Subject | undefined;
	editName: (newName: string) => void;
	addSubject: (newSubject: Subject) => void;
	removeSubject: (id: Id) => void;
	editSubject: (newSubject: Subject) => void;
	addTask: (newTask: SubjectTask) => void;
	removeTask: (oldTask: SubjectTask) => void;
	editTask: (newTask: SubjectTask) => void;
}

interface useScheduleReturn extends ScheduleControlI {
	schedule: Schedule;
}

export function useSchedule(initialSchedule: Schedule): useScheduleReturn {
	const [schedule, setSchedule] = useState<Schedule>(initialSchedule);

	const getSubject = (id: Id): Subject | undefined => {
		return schedule.subjects.find((subject) => subject.id == id);
	};

	const editName = (newName: string): void => {
		setSchedule((prev) => ({
			...prev,
			name: newName
		}));
	};

	const addSubject = (newSubject: Subject): void => {
		setSchedule((prev) => ({
			...prev,
			subjects: [...prev.subjects, newSubject]
		}));
	};

	const removeSubject = (id: Id): void => {
		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.filter((subject) => subject.id != id)
		}));
	};

	const editSubject = (newSubject: Subject): void => {
		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.map((subject) => {
				if (subject.id == newSubject.id) return { ...newSubject };
				return subject;
			})
		}));
	};

	const addTask = (newTask: SubjectTask) => {
		setSchedule((prev) => ({
			...prev,
			subjects: prev.subjects.map((subject) => {
				if ((subject.id = newTask.subjectId))
					return { ...subject, tasks: [...subject.tasks, newTask] };
				return subject;
			})
		}));
	};

	const removeTask = (oldTask: SubjectTask) => {
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
	};

	const editTask = (newTask: SubjectTask) => {
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

	return {
		schedule,
		getSubject,
		editName,
		addSubject,
		removeSubject,
		editSubject,
		addTask,
		removeTask,
		editTask
	};
}
