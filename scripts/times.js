// Insert zeros in the time value if necessary
export function pad(value, size) {
	let str = value.toString();
	while (str.length < size) str = "0" + str;
	return str;
}

// Convert minutes in time HH:mm
export function formatMinutesToTime(totalMinutes) {
	// Out of range
	if (totalMinutes < 0 || totalMinutes > 60 * 24) {
		return "";
	}

	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes - 60 * hours;

	return `${pad(hours, 2)}:${pad(minutes, 2)}`;
}

// Convert time HH:mm to minutes
export function formatTimeToMinutes(time) {
	const [hours, minutes] = time.split(":");
	const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
	return totalMinutes;
}

// Returns the percentual position of a value in the range start-end
export function percentageRatio(value, start, end) {
	const ratio = (value - start) / (end - start);
	return ratio * 100;
}
