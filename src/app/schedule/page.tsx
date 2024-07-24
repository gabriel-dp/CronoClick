"use client";

import dynamic from "next/dynamic";

import { Configs } from "@/types/configs";
import { Schedule } from "@/types/schedules";
import { useSchedule } from "@/hooks/useSchedule";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCloseTabAlert } from "@/hooks/useCloseTabAlert";
import ScheduleControl from "@/components/ScheduleControl";
import TaskControl from "@/components/TaskControl";
import TaskList from "@/components/TaskList";

import {
	MainContainer,
	ScheduleContainer,
	SectionTitle,
	TasksContainer
} from "./styles";

// Schedule should not be pre-rendered on the server
const ScheduleWeek = dynamic(() => import("@/components/ScheduleWeek"), {
	ssr: false,
	loading: () => <p>Loading Schedule</p>
});

const generateInitialSchedule = (): Schedule => ({
	id: "",
	name: "",
	subjects: [
		{
			id: "aa",
			color: "#FF00F0",
			name: "Teste",
			tasks: [
				{
					id: "1",
					description: "abuble",
					name: "Prova 2",
					submission: "2024-07-27T21:08:44+0000"
				},
				{
					id: "2",
					description: "abuble",
					name: "Prova 4",
					submission: "2024-07-28T21:02:44+0000"
				},
				{
					id: "3",
					description: "abuble",
					name: "Prova 3",
					submission: "2024-07-27T21:08:44+0000"
				},
				{
					id: "4",
					description: "abuble",
					name: "Prova 1",
					submission: "2024-07-27T15:08:44+0000"
				}
			],
			teacher: "",
			times: [
				{
					days: 15,
					duration: 110,
					start: 480
				}
			]
		}
	]
});

const generateInitialConfigs = (): Configs => ({
	firstDayWeek: "1",
	minimizeTimeSpan: false,
	weekends: false,
	timeInterval: "60"
});

export default function SchedulePage() {
	const [storedConfigs, setStoredConfigs] = useLocalStorage<Configs>(
		"cc-configs",
		generateInitialConfigs()
	);

	const [storedSchedule, setStoredSchedule] = useLocalStorage<Schedule>(
		"cc-schedule",
		generateInitialSchedule()
	);

	const { schedule, ...controls } = useSchedule(storedSchedule);
	const { disableCloseAlert } = useCloseTabAlert(schedule);

	// Function to save the current schedule
	const saveChanges = () => {
		setStoredSchedule(schedule);
		disableCloseAlert();
	};

	return (
		<MainContainer>
			<ScheduleContainer>
				<SectionTitle>Cronograma</SectionTitle>
				<ScheduleControl
					controls={controls}
					configs={storedConfigs}
					setConfigs={setStoredConfigs}
					saveChanges={saveChanges}
				/>
				<ScheduleWeek
					subjects={schedule.subjects}
					controls={controls}
					configs={storedConfigs}
				/>
			</ScheduleContainer>
			<TasksContainer>
				<SectionTitle>Tarefas</SectionTitle>
				<TaskControl saveChanges={saveChanges} />
				<TaskList
					subjects={schedule.subjects}
					controls={controls}
					hideFinished={false}
				/>
			</TasksContainer>
		</MainContainer>
	);
}
