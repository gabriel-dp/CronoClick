import { Class, DayClasses } from "@/types/classes";
import { ScheduleControlI } from "@/hooks/useSchedule";

import DaysRow from "./DaysRow";
import TimeColumn from "./TimeColumn";
import ClassesGrid from "./ClassesGrid";
import { ScheduleContainer } from "./styles";

const MIN_START = 0;
const MAX_END = 24 * 60;

interface ScheduleProps {
	week: DayClasses[];
	controls: ScheduleControlI;
}

export default function Schedule(props: ScheduleProps) {
	const INTERVAL = 60;
	const DEFAULT_START = 8 * 60;
	const MIN_DIFF = 5 * 60;

	// Get data from week
	const { start, end, days, weekClasses } = props.week.reduce<{
		start: number;
		end: number;
		days: string[];
		weekClasses: Class[][];
	}>(
		(acc, cur) => {
			acc.days.push(cur.day);
			acc.weekClasses.push(cur.items);
			cur.items.forEach((item) => {
				if (item.start < acc.start) {
					acc.start = item.start;
				}
				if (item.start + item.duration > acc.end) {
					acc.end = item.start + item.duration;
				}
			});

			return acc;
		},
		{ start: MAX_END, end: MIN_START, days: [], weekClasses: [] }
	);

	// Set schedule start and end times
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
			<ClassesGrid
				weekClasses={weekClasses}
				start={startFloor}
				end={endCeil}
				interval={INTERVAL}
				controls={props.controls}
			/>
		</ScheduleContainer>
	);
}
