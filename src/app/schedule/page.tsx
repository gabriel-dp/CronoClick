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

// Schedule should not be pre-rendered on the server
const ScheduleWeek = dynamic(() => import("@/components/ScheduleWeek"), {
	ssr: false,
	loading: () => <p>Loading Schedule</p>
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
					saveChanges={saveChanges}
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
				<p>tarefas</p>
			</TasksContainer>
		</MainContainer>
	);
}
