"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaAngleDown as DrowdownIcon } from "react-icons/fa";

import { Configs } from "@/types/configs";
import { Id, Schedule } from "@/types/schedules";
import { useSchedule } from "@/hooks/useSchedule";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/ui/Modal";
import ScheduleForm from "@/components/forms/ScheduleForm";

import {
	MainContainer,
	ScheduleContainer,
	SectionTitle
	// TasksContainer
} from "./styles";

// Schedule and Tasks should not be pre-rendered on the server
const ScheduleWeek = dynamic(() => import("@/components/ScheduleWeek"), {
	ssr: false,
	loading: () => <p>Carregando...</p>
});
// const TaskList = dynamic(() => import("@/components/TaskList"), {
// 	ssr: false,
// 	loading: () => <p>Carregando...</p>
// });

const generateInitialConfigs = (): Configs => ({
	firstDayWeek: "1",
	minimizeTimeSpan: false,
	weekends: false,
	timeInterval: "60",
	hideFinishedTasks: true
});

export default function SchedulePage() {
	const scheduleModal = useModal();

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

	// Redirect unauthenticated users
	const router = useRouter();
	if (session.status == "unauthenticated") {
		router.replace("/");
	}

	// Set initial option using first
	useEffect(() => {
		if (userSchedules) setSelectedSchedule(userSchedules[0].id);
	}, [userSchedules]);

	// Schedule used on client starts empty
	const [schedule, setSchedule] = useState<Schedule>({
		id: "",
		name: "",
		subjects: []
	});

	// Start schedule controls interface
	useEffect(() => {
		if (scheduleData) setSchedule(scheduleData);
	}, [scheduleData]);

	const controls = useSchedule(schedule, setSchedule);

	return (
		<MainContainer>
			<Modal {...scheduleModal}>
				<ScheduleForm
					current={schedule}
					controls={controls}
					changeSchedule={setSelectedSchedule}
					finally={scheduleModal.close}
				/>
			</Modal>
			<ScheduleContainer>
				<SectionTitle onClick={scheduleModal.open}>
					{schedule.name}
					<DrowdownIcon className="icon dropdown" />
				</SectionTitle>
				<ScheduleWeek
					schedule={schedule}
					controls={controls}
					configs={storedConfigs}
					setConfigs={setStoredConfigs}
				/>
			</ScheduleContainer>
			{/* <TasksContainer>
				<SectionTitle>Tarefas</SectionTitle>
				<TaskList
					schedule={schedule}
					configs={storedConfigs}
					setConfigs={setStoredConfigs}
					controls={controls}
				/>
			</TasksContainer> */}
		</MainContainer>
	);
}
