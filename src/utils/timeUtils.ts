export const formatMinutesToTime = (
	totalMinutes: number,
	format?: "12-hour" | "24-hour"
): string => {
	if (totalMinutes < 0 || totalMinutes > 60 * 24) {
		return ""; // out of range
	}

	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes - 60 * hours;

	const timeLocal = new Date(2024, 0, 1, hours, minutes).toLocaleTimeString(
		undefined,
		{
			hour: "2-digit",
			minute: "2-digit",
			hour12: format ? format == "12-hour" : undefined
		}
	);

	return timeLocal;
};

export const formatTimeToMinutes = (time: string) => {
	const [hours, minutes] = time.split(":");
	const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
	return totalMinutes;
};
