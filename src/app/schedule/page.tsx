"use client";

import { DayClasses } from "@/types/classes";
import { useSchedule } from "@/hooks/useSchedule";
import { decodeValue } from "@/utils/daysUtils";
import ScheduleWeek from "@/components/ScheduleWeek";
import ScheduleControl from "@/components/ScheduleControl";
import { LocalDaysNames } from "@/utils/timeUtils";

export default function SchedulePage() {
	const { schedule, ...controls } = useSchedule();

	// Define week structure
	const days: string[] = LocalDaysNames().filter((_, i) => i != 0 && i != 6);
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

	return (
		<>
			<ScheduleControl controls={controls} />
			<ScheduleWeek week={week} controls={controls} />
		</>
	);
}
