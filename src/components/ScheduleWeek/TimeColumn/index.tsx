import { formatMinutesToTime } from "@/utils/timeUtils";

import { ColumnContainer, TimeContainer } from "./styles";

interface TimeColumnProps {
	start: number;
	end: number;
	interval: number;
}

export default function TimeColumn(props: TimeColumnProps) {
	const intervals: number =
		Math.ceil((props.end - props.start) / props.interval) + 1;
	const times: string[] = Array.from({ length: intervals }, (_, i) =>
		formatMinutesToTime(props.start + props.interval * i)
	);

	return (
		<ColumnContainer>
			{times.map((time, i) => (
				<TimeContainer key={i}>{time}</TimeContainer>
			))}
		</ColumnContainer>
	);
}
