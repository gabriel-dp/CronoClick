export const DAYS = ["", "SEG", "TER", "QUA", "QUI", "SEX", ""];

export function encodeDays(days) {
	let sum = 0;
	for (let i = 0; i < days.length; i++) {
		if (days[i]) sum += Math.pow(2, i);
	}

	return sum;
}

export function decodeValue(value) {
	const b = Array(7);
	for (let i = 0; i < 7; i++) {
		b[i] = ((1 << i) & value) != 0;
	}

	return b;
}

export const generateInitialWeek = () => {
	const week = DAYS.map((day) => ({
		day,
		items: [],
	}));

	return week;
};
