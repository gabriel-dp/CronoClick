"use client";

import { Schedule } from "@/types/schedules";
import { DayClasses } from "@/types/classes";
import { useSchedule } from "@/hooks/useSchedule";
import { decodeValue } from "@/utils/daysUtils";
import ScheduleWeek from "@/components/ScheduleWeek";
import ScheduleControl from "@/components/ScheduleControl";

const SCHEDULE_SAMPLE: Schedule = {
	id: "a",
	name: "meu nome",
	subjects: [
		{
			id: "b",
			name: "tecweb",
			teacher: "matheus",
			color: "#54afff",
			times: [
				{
					days: 8 + 2,
					start: 620,
					duration: 100
				}
			],
			tasks: []
		},
		{
			id: "c",
			name: "teste",
			teacher: "???",
			color: "#ffa0df",
			times: [
				{
					days: 16 + 4,
					start: 620,
					duration: 100
				},
				{
					days: 10,
					start: 730,
					duration: 90
				}
			],
			tasks: []
		}
	]
};

export default function SchedulePage() {
	const { schedule, ...controls } = useSchedule(SCHEDULE_SAMPLE);

	// Define week structure
	const days: string[] = ["", "SEG", "TER", "QUA", "QUI", "SEX", ""];
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
