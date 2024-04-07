import { generateInitialWeek, decodeValue } from "./days.js";

// Convert the subjects array to an array of classes in each day
export function convertSubjectsToClasses(schedule) {
	const { fullWeek } = schedule.subjects.reduce(
		(acc, cur) => {
			cur.times.forEach((time) => {
				const decodedWeek = decodeValue(time.days);
				decodedWeek.forEach((day, i) => {
					if (day === true) {
						acc.fullWeek[i].items.push({
							start: time.start,
							duration: time.duration,
							subject: {
								id: cur.id,
								name: cur.name,
								teacher: cur.teacher,
								color: cur.color,
							},
						});
					}
				});
			});

			return acc;
		},
		{ fullWeek: generateInitialWeek() }
	);

	// Remove days with empty name
	const filteredWeek = fullWeek.filter((weekDay) => weekDay.day.length > 0);
	return filteredWeek;
}

// Extracts all necessary data to render the schedule (time, days and classes)
export function getWeekData(week) {
	const MIN_START = 0;
	const MAX_END = 24 * 60;

	const INTERVAL = 60;
	const DEFAULT_START = 7 * 60;
	const MIN_DIFF = 5 * 60;

	// Get data from week
	const { start, end, days, weekClasses } = week.reduce(
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
	const startFloor = start != MAX_END ? Math.floor(start / INTERVAL) * INTERVAL : DEFAULT_START;
	const endCeil = Math.ceil(Math.max(end, startFloor + MIN_DIFF) / INTERVAL) * INTERVAL;

	return { startFloor, endCeil, days, weekClasses, interval: INTERVAL };
}

export const getAllData = (schedule) => getWeekData(convertSubjectsToClasses(schedule));
