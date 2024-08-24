import { Configs } from "@/types/configs";
import { Class, DayClasses } from "@/types/classes";
import { Subject } from "@/types/schedules";
import { decodeValue } from "@/utils/daysUtils";
import { ScheduleControlI } from "@/utils/scheduleUtils";

import DaysRow from "./DaysRow";
import TimeColumn from "./TimeColumn";
import ClassesGrid from "./ClassesGrid";
import { ScheduleContainer } from "./styles";
import { getLocalDaysNames } from "@/utils/timeUtils";

const MIN_START = 0;
const MAX_END = 24 * 60;
const DEFAULT_START = 8 * 60;
const DEFAULT_MIN_DIFF = 4 * 60;

interface ScheduleProps {
	subjects: Subject[];
	controls: ScheduleControlI;
	configs: Configs;
}

export default function ScheduleGrid(props: ScheduleProps) {
	const { weekends, minimizeTimeSpan } = props.configs;
	const interval = parseInt(props.configs.timeInterval);
	const firstWeekDay = parseInt(props.configs.firstDayWeek);

	// Set minimum interval between start and end
	const minDiff = minimizeTimeSpan ? interval : DEFAULT_MIN_DIFF;

	// Set week data structure
	const week: DayClasses[] = getLocalDaysNames().map((day) => ({
		day,
		items: []
	}));

	// Add all subjects in its correct days
	props.subjects.forEach((subject) => {
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

	// Set first day of the week
	const reorderedWeek = week
		.slice(firstWeekDay, 7)
		.concat(week.slice(0, firstWeekDay));

	// Remove weekends if necessary
	const filteredWeek = reorderedWeek.filter(
		(_, i) =>
			weekends || (i != (7 - firstWeekDay) % 7 && i != 6 - firstWeekDay)
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
