"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

import { Configs } from "@/types/configs";
import { Id, Schedule } from "@/types/schedules";
import { useSchedule } from "@/hooks/useSchedule";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useApiRequest } from "@/hooks/useApiRequest";
import ScheduleControl from "@/components/ScheduleControl";

import {
	MainContainer,
	ScheduleContainer,
	SectionTitle,
	TasksContainer
} from "./styles";
import Dropdown from "@/components/ui/Dropdown";

// Schedule and Tasks should not be pre-rendered on the server
const ScheduleWeek = dynamic(() => import("@/components/ScheduleWeek"), {
	ssr: false,
	loading: () => <p>Loading Schedule</p>
});
const TaskControl = dynamic(() => import("@/components/TaskControl"), {
	ssr: false,
	loading: () => <p>Loading Task Controls</p>
});
const TaskList = dynamic(() => import("@/components/TaskList"), {
	ssr: false,
	loading: () => <p>Loading Tasks</p>
});

const generateInitialConfigs = (): Configs => ({
	firstDayWeek: "1",
	minimizeTimeSpan: false,
	weekends: false,
	timeInterval: "60"
});

export default function SchedulePage() {
	// User configs stored in browser
	const [storedConfigs, setStoredConfigs] = useLocalStorage<Configs>(
		"cc-configs",
		generateInitialConfigs()
	);

	// Get all schedules from the user
	const session = useSession();
	const { data: userSchedules } = useApiRequest<Schedule[]>(
		`schedules/fromUser/${session?.data?.id}`,
		{
			method: "GET",
			body: {},
			immediate: session.status == "authenticated"
		}
	);

	// Get data from the selected schedule
	const [selectedSchedule, setSelectedSchedule] = useState<Id | null>(null);
	const { data: scheduleData } = useApiRequest<Schedule>(
		`schedules/${selectedSchedule}`,
		{ method: "GET", body: {}, immediate: selectedSchedule != null }
	);

	// Define schedule options to select
	const scheduleOptions = useMemo(
		() =>
			userSchedules?.reduce<{ [key: string]: string }>((acc, cur) => {
				acc[cur.id] = cur.name;
				return acc;
			}, {}) ?? {},
		[userSchedules]
	);
	useEffect(() => {
		if (userSchedules && Object.keys(scheduleOptions).length > 0)
			setSelectedSchedule(Object.keys(scheduleOptions)[0]); // Set initial option using first
	}, [userSchedules, scheduleOptions]);

	// Start schedule controls interface
	const [schedule, setSchedule] = useState<Schedule>({
		id: "",
		name: "",
		subjects: []
	});
	useEffect(() => {
		if (scheduleData) setSchedule(scheduleData);
	}, [scheduleData]);
	const controls = useSchedule(schedule, setSchedule);

	return (
		<MainContainer>
			<ScheduleContainer>
				<Dropdown
					label="Cronograma"
					name="selected"
					onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
						setSelectedSchedule(event.target.value)
					}
					options={scheduleOptions}
					disableNullOption
				/>
				<SectionTitle>Cronograma</SectionTitle>
				<ScheduleControl
					controls={controls}
					configs={storedConfigs}
					setConfigs={setStoredConfigs}
				/>
				<ScheduleWeek
					subjects={schedule.subjects}
					controls={controls}
					configs={storedConfigs}
				/>
			</ScheduleContainer>
			<TasksContainer>
				<SectionTitle>Tarefas</SectionTitle>
				<TaskControl controls={controls} />
				<TaskList
					subjects={schedule.subjects}
					controls={controls}
					hideFinished={false}
				/>
			</TasksContainer>
		</MainContainer>
	);
}
