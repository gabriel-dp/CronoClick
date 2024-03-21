import { Class, DayClasses } from "@/types/schedule";

import DaysRow from "./DaysRow";
import TimeColumn from "./TimeColumn";
import ClassGrid from "./ClassGrid";
import { ScheduleContainer } from "./styles";

const MIN_START = 0;
const MAX_END = 24 * 60;

interface ScheduleProps {
	week: DayClasses[];
}

export default function Schedule(props: ScheduleProps) {
	const INTERVAL = 60;
	const DEFAULT_START = 8 * 60;
	const MIN_DIFF = 9 * 60;

	// Finds the earliest start and the latest end
	const { start, end, days, subjectsDays } = props.week.reduce<{
		start: number;
		end: number;
		days: string[];
		subjectsDays: Class[][];
	}>(
		(acc, dayClasses) => {
			acc.days.push(dayClasses.day);
			acc.subjectsDays.push(dayClasses.items);
			dayClasses.items.forEach((item) => {
				if (item.start < acc.start) {
					acc.start = item.start;
				}
				if (item.end > acc.end) {
					acc.end = item.end;
				}
			});

			return acc;
		},
		{ start: MAX_END, end: MIN_START, days: [], subjectsDays: [] }
	);

	const startFloor =
		start != MAX_END
			? Math.floor(start / INTERVAL) * INTERVAL
			: DEFAULT_START;
	const endCeil =
		Math.ceil(Math.max(end, startFloor + MIN_DIFF) / INTERVAL) * INTERVAL;

	return (
		<ScheduleContainer>
			<div className="empty"></div>
			<DaysRow days={days} />
			<TimeColumn start={startFloor} end={endCeil} interval={INTERVAL} />
			<ClassGrid
				subjectsDays={subjectsDays}
				start={startFloor}
				end={endCeil}
				interval={INTERVAL}
			/>
		</ScheduleContainer>
	);
}
