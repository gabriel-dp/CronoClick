"use client";

import { useState } from "react";

import { Id, Schedule, Subject } from "@/types/schedules";

export interface ScheduleControlI {
	getSubject: (id: Id) => Subject | undefined;
	editName: (newName: string) => void;
	addSubject: (newSubject: Subject) => void;
	removeSubject: (id: Id) => void;
	editSubject: (newSubject: Subject) => void;
}

interface useScheduleReturn extends ScheduleControlI {
	schedule: Schedule;
}

const generateInitialSchedule = (): Schedule => ({
	id: "",
	name: "",
	subjects: []
});

export function useSchedule(initialSchedule?: Schedule): useScheduleReturn {
	const [schedule, setSchedule] = useState<Schedule>(
		initialSchedule ?? generateInitialSchedule()
	);

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
				if (subject.id == newSubject.id) {
					return { ...newSubject };
				}
				return subject;
			})
		}));
	};

	return {
		getSubject,
		schedule,
		editName,
		addSubject,
		removeSubject,
		editSubject
	};
}
