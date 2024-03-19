import { Class } from "@/types/schedule";

import Grid from "./Grid";
import DaysRow from "./DaysRow";
import TimeColumn from "./TimeColumn";
import { ScheduleContainer } from "./styles";

const DATA: {
	day: string;
	items: Class[];
}[] = [
	{
		day: "SEG",
		items: []
	},
	{
		day: "TER",
		items: []
	},
	{
		day: "QUA",
		items: []
	},
	{
		day: "QUI",
		items: []
	},
	{
		day: "SEX",
		items: []
	}
];

export default function Schedule() {
	const { start: START, end: END } = DATA.reduce(
		(acc, day) => {
			if (day.items.length == 0) {
				// Default start-end
				return { start: 9 * 60, end: 15 * 60 };
			}

			// Finds the earliest start and the latest end
			day.items.forEach((item) => {
				if (item.start < acc.start) {
					acc.start = item.start;
				}
				if (item.end > acc.end) {
					acc.end = item.end;
				}
			});

			return acc;
		},
		{ start: Infinity, end: -Infinity }
	);

	const INTERVAL = 60;
	const startFloor = Math.floor(START / INTERVAL) * INTERVAL;
	const endCeil = Math.ceil(END / INTERVAL) * INTERVAL;

	const days: string[] = DATA.map((element) => element.day);
	const subjectsDays: Class[][] = DATA.map((element) => element.items);

	return (
		<ScheduleContainer>
			<div className="empty"></div>
			<DaysRow days={days} />
			<TimeColumn start={startFloor} end={endCeil} interval={INTERVAL} />
			<Grid
				subjectsDays={subjectsDays}
				start={startFloor}
				end={endCeil}
				interval={INTERVAL}
			/>
		</ScheduleContainer>
	);
}
