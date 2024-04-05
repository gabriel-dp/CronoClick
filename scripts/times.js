export function pad(value, size) {
	let str = value.toString();
	while (str.length < size) str = "0" + str;
	return str;
}

export function formatMinutesToTime(totalMinutes) {
	// out of range
	if (totalMinutes < 0 || totalMinutes > 60 * 24) {
		return "";
	}

	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes - 60 * hours;

	return `${pad(hours, 2)}:${pad(minutes, 2)}`;
}

export function formatTimeToMinutes(time) {
	const [hours, minutes] = time.split(":");
	const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
	return totalMinutes;
}
