type TimeFormat = "HH:MM" | "HH:MM XM";

export function pad(value: number, size: number): string {
	let str = value.toString();
	while (str.length < size) str = "0" + str;
	return str;
}

export const formatMinutesToTime = (
	totalMinutes: number,
	format: TimeFormat
): string => {
	// out of range
	if (totalMinutes < 0 || totalMinutes > 60 * 24) {
		return "";
	}

	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes - 60 * hours;

	if (format == "HH:MM") {
		return `${pad(hours, 2)}:${pad(minutes, 2)}`;
	}

	const sufix = hours > 12 ? "PM" : "AM";
	const hours12 = hours > 12 ? hours - 12 : hours;
	return `${pad(hours12, 2)}:${pad(minutes, 2)} ${sufix}`;
};
