import { Schedule } from "@/types/schedules";
import { DayClasses } from "@/types/classes";
import { decodeValue } from "@/utils/daysUtils";
import ScheduleWeek from "@/components/ScheduleWeek";

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
					duration: 60
				}
			],
			tasks: []
		}
	]
};

export default function SchedulePage() {
	// Define week structure
	const days: string[] = ["", "SEG", "TER", "QUA", "QUI", "SEX", ""];
	const initialWeek: DayClasses[] = days.map((day) => ({
		day,
		items: []
	}));

	// Convert subjects into classes
	const { fullWeek } = SCHEDULE_SAMPLE.subjects.reduce<{
		fullWeek: DayClasses[];
	}>(
		(acc, cur) => {
			cur.times.forEach((time) => {
				const decodedWeek = decodeValue(time.days);
				decodedWeek.forEach((day, i) => {
					if (day) {
						initialWeek[i].items.push({
							id: cur.id,
							name: cur.name,
							teacher: cur.teacher,
							color: cur.color,
							start: time.start,
							duration: time.duration
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
			<ScheduleWeek week={week} />
		</>
	);
}
