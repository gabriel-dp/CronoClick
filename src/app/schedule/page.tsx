"use client";

import dynamic from "next/dynamic";

import { Configs } from "@/types/configs";
import { Schedule } from "@/types/schedules";
import { useSchedule } from "@/hooks/useSchedule";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCloseTabAlert } from "@/hooks/useCloseTabAlert";
import ScheduleControl from "@/components/ScheduleControl";

import {
	MainContainer,
	ScheduleContainer,
	SectionTitle,
	TasksContainer
} from "./styles";

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

const generateInitialSchedule = (): Schedule => ({
	id: "",
	name: "",
	subjects: []
});

const generateInitialConfigs = (): Configs => ({
	firstDayWeek: "1",
	minimizeTimeSpan: false,
	weekends: false,
	timeInterval: "60"
});

export default function SchedulePage() {
	const [storedSchedule, setStoredSchedule] = useLocalStorage<Schedule>(
		"cc-schedule",
		generateInitialSchedule()
	);

	const [storedConfigs, setStoredConfigs] = useLocalStorage<Configs>(
		"cc-configs",
		generateInitialConfigs()
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
				<TaskControl saveChanges={saveChanges} controls={controls} />
				<TaskList
					subjects={schedule.subjects}
					controls={controls}
					hideFinished={false}
				/>
			</TasksContainer>
		</MainContainer>
	);
}
