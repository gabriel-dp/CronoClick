type TimeFormat = "HH:MM" | "HH:MM XM";

function pad(value: number, size: number) {
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

	let hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes - 60 * hours;

	const time = `${pad(hours, 2)}:${pad(minutes, 2)}`;
	if (format == "HH:MM") {
		return time;
	}

	let sufix = "AM";
	if (hours > 12) {
		hours -= 12;
		sufix = "PM";
	}
	return `${pad(hours, 2)}:${pad(minutes, 2)} ${sufix}`;
};
