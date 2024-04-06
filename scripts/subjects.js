import { generateInitialWeek, decodeValue } from "./days.js";

export const initialSchedule = {
	id: "",
	name: "",
	subjects: [
		{
			id: "",
			name: "Tecnologias Web",
			color: "#77DDDD",
			teacher: "Matheus Viana",
			times: [
				{
					days: 4 + 16,
					start: 8 * 60,
					duration: 110,
				},
			],
			tasks: [],
		},
		{
			id: "",
			name: "Engenharia de Software",
			color: "#DD77DD",
			teacher: "Elisa Tuler",
			times: [
				{
					days: 4 + 16,
					start: 15.25 * 60,
					duration: 110,
				},
				{
					days: 32,
					start: 9 * 60,
					duration: 180,
				},
			],
			tasks: [],
		},
		{
			id: "",
			name: "Intervalo",
			color: "#DDDDDD",
			teacher: "",
			times: [
				{
					days: 2 + 4 + 8 + 16 + 32,
					start: 12 * 60,
					duration: 1 * 60,
				},
			],
		},
	],
};

export function convertSubjectsToClasses(schedule) {
	const { fullWeek } = schedule.subjects.reduce(
		(acc, cur) => {
			cur.times.forEach((time) => {
				const decodedWeek = decodeValue(time.days);
				decodedWeek.forEach((day, i) => {
					if (day) {
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

	const filteredWeek = fullWeek.filter((weekDay) => weekDay.day.length > 0);
	return filteredWeek;
}

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

export const getAllData = () => getWeekData(convertSubjectsToClasses(initialSchedule));
