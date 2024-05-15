"use client";

import dynamic from "next/dynamic";

import { Configs } from "@/types/configs";
import { Schedule } from "@/types/schedules";
import { DayClasses } from "@/types/classes";
import { useSchedule } from "@/hooks/useSchedule";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCloseTabAlert } from "@/hooks/useCloseTabAlert";
import { decodeValue } from "@/utils/daysUtils";
import { LocalDaysNames } from "@/utils/timeUtils";
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
	firstDayWeek: 0,
	minimizeTimeSpan: false,
	weekends: false,
	timeInterval: 60
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
	const initialWeek: DayClasses[] = LocalDaysNames().map((day) => ({
		day,
		items: []
	}));

	// Convert subjects into classes
	const { fullWeek } = schedule.subjects.reduce<{
		fullWeek: DayClasses[];
	}>(
		(acc, cur) => {
			cur.times.forEach((time) => {
				const decodedWeek = decodeValue(time.days);
				decodedWeek.forEach((day, i) => {
					if (day) {
						initialWeek[i].items.push({
							start: time.start,
							duration: time.duration,
							subject: {
								id: cur.id,
								name: cur.name,
								teacher: cur.teacher,
								color: cur.color
							}
						});
					}
				});
			});

			return acc;
		},
		{ fullWeek: initialWeek }
	);

	// Adjust week days
	const week = fullWeek.filter((singleDay) => singleDay.day.length > 0);

	const saveChanges = () => {
		setStoredSchedule(schedule);
		disableCloseAlert();
	};

	const updateConfigs = (newConfigs: Configs) => {
		setStoredConfigs(newConfigs);
	};

	return (
		<>
			<ScheduleControl
				controls={controls}
				saveChanges={saveChanges}
				updateConfigs={updateConfigs}
			/>
			<ScheduleWeek
				week={week}
				controls={controls}
				configs={storedConfigs}
			/>
		</>
	);
}
