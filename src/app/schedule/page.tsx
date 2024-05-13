"use client";

import dynamic from "next/dynamic";

import { Schedule } from "@/types/schedules";
import { DayClasses } from "@/types/classes";
import { useSchedule } from "@/hooks/useSchedule";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { decodeValue } from "@/utils/daysUtils";
import ScheduleControl from "@/components/ScheduleControl";
import { LocalDaysNames } from "@/utils/timeUtils";

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

export default function SchedulePage() {
	const [storedSchedule, setStoredSchedule] = useLocalStorage<Schedule>(
		"cc-schedule",
		generateInitialSchedule()
	);
	const { schedule, ...controls } = useSchedule(storedSchedule);

	// Define week structure
	const days: string[] = LocalDaysNames().map((day, i) => {
		if (i != 0 && i != 6) return day;
		return "";
	});

	const initialWeek: DayClasses[] = days.map((day) => ({
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
	};

	return (
		<>
			<ScheduleControl controls={controls} saveChanges={saveChanges} />
			<ScheduleWeek week={week} controls={controls} />
		</>
	);
}
