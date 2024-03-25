export function encodeDays(days: boolean[]): number {
	let sum = 0;
	for (let i = 0; i < days.length; i++) {
		sum += Math.pow(2, i);
	}
	return sum;
}

export function decodeValue(value: number): boolean[] {
	const b = Array<boolean>(7);
	for (let i = 0; i < 7; i++) {
		b[i] = ((1 << i) & value) != 0;
	}
	return b;
}
