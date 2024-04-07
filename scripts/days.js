const DAYS = ["", "SEG", "TER", "QUA", "QUI", "SEX", ""]; // Empty days should not be rendered

// Receives a array of seven boolean values and convert it to numeric bit-equivalent
export function encodeDays(days) {
	let sum = 0;
	for (let i = 0; i < days.length; i++) {
		if (days[i]) sum += Math.pow(2, i);
	}

	return sum;
}

// Receives a numeric and convert it to a bit-equivalent array of seven boolean values
export function decodeValue(value) {
	const b = Array(7);
	for (let i = 0; i < 7; i++) {
		b[i] = ((1 << i) & value) != 0;
	}

	return b;
}

// Generate an array of classes in each day
export const generateInitialWeek = () => {
	const week = DAYS.map((day) => ({
		day,
		items: [],
	}));

	return week;
};
