import { formatMinutesToTime } from "@/utils/timeUtils";

import { ColumnContainer, TimeContainer } from "./styles";

interface TimeColumnProps {
	start: number;
	end: number;
	interval: number;
}

export default function TimeColumn(props: TimeColumnProps) {
	const intervals = Math.ceil((props.end - props.start) / props.interval) + 1;

	return (
		<ColumnContainer>
			{Array.from({ length: intervals }, (_, i) => (
				<TimeContainer key={i}>
					{formatMinutesToTime(props.start + props.interval * i)}
				</TimeContainer>
			))}
		</ColumnContainer>
	);
}
