export function pad(value: number, size: number): string {
	let str = value.toString();
	while (str.length < size) str = "0" + str;
	return str;
}

export const formatMinutesToTime = (totalMinutes: number): string => {
	// out of range
	if (totalMinutes < 0 || totalMinutes > 60 * 24) {
		return "";
	}

	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes - 60 * hours;

	return `${pad(hours, 2)}:${pad(minutes, 2)}`;
};

export const formatTimeToMinutes = (time: string) => {
	const [hours, minutes] = time.split(":");
	const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
	return totalMinutes;
};
