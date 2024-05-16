import { Configs } from "@/types/configs";
import { Class, DayClasses } from "@/types/classes";
import { ScheduleControlI } from "@/hooks/useSchedule";

import DaysRow from "./DaysRow";
import TimeColumn from "./TimeColumn";
import ClassesGrid from "./ClassesGrid";
import { ScheduleContainer } from "./styles";

const MIN_START = 0;
const MAX_END = 24 * 60;
const DEFAULT_START = 8 * 60;
const DEFAULT_MIN_DIFF = 4 * 60;

interface ScheduleProps {
	week: DayClasses[];
	controls: ScheduleControlI;
	configs: Configs;
}

export default function Schedule(props: ScheduleProps) {
	const { timeInterval: interval } = props.configs;

	// Set minimum interval between start and end
	const minDiff = props.configs.minimizeTimeSpan
		? interval
		: DEFAULT_MIN_DIFF;

	// Set first day of the week
	const reorderedWeek = props.week
		.slice(props.configs.firstDayWeek, 7)
		.concat(props.week.slice(0, props.configs.firstDayWeek));

	// Remove weekends if necessary
	const filteredWeek = reorderedWeek.filter(
		(_, i) =>
			props.configs.weekends ||
			(i != (7 - props.configs.firstDayWeek) % 7 &&
				i != 6 - props.configs.firstDayWeek)
	);

	// Get data from week
	const { start, end, days, weekClasses } = filteredWeek.reduce<{
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
			? Math.floor(start / interval) * interval
			: DEFAULT_START;
	const endCeil =
		Math.ceil(Math.max(end, startFloor + minDiff) / interval) * interval;

	return (
		<ScheduleContainer>
			<div className="empty"></div>
			<DaysRow days={days} />
			<TimeColumn start={startFloor} end={endCeil} interval={interval} />
			<ClassesGrid
				weekClasses={weekClasses}
				start={startFloor}
				end={endCeil}
				interval={interval}
				controls={props.controls}
			/>
		</ScheduleContainer>
	);
}
