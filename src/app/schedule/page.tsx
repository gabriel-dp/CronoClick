"use client";

import dynamic from "next/dynamic";

import { Configs } from "@/types/configs";
import { Schedule } from "@/types/schedules";
import { DayClasses } from "@/types/classes";
import { useSchedule } from "@/hooks/useSchedule";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCloseTabAlert } from "@/hooks/useCloseTabAlert";
import { decodeValue } from "@/utils/daysUtils";
import { getLocalDaysNames } from "@/utils/timeUtils";
import ScheduleControl from "@/components/ScheduleControl";

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

	// Set week data structure
	const week: DayClasses[] = getLocalDaysNames().map((day) => ({
		day,
		items: []
	}));

	// Add all subjects in its correct days
	schedule.subjects.forEach((subject) => {
		subject.times.forEach((time) => {
			const decodedTimeDays = decodeValue(time.days);
			decodedTimeDays.forEach((day, i) => {
				if (day) {
					week[i].items.push({
						start: time.start,
						duration: time.duration,
						subject: {
							id: subject.id,
							name: subject.name,
							teacher: subject.teacher,
							color: subject.color
						}
					});
				}
			});
		});
	});

	// Function to save the current schedule
	const saveChanges = () => {
		setStoredSchedule(schedule);
		disableCloseAlert();
	};

	return (
		<>
			<ScheduleControl
				controls={controls}
				saveChanges={saveChanges}
				configs={storedConfigs}
				setConfigs={setStoredConfigs}
			/>
			<ScheduleWeek
				week={week}
				controls={controls}
				configs={storedConfigs}
			/>
		</>
	);
}
