import { Class } from "@/types/schedule";

import { DayContainer, GridContainer, IntervalLine } from "./styles";

interface GridProps {
	subjectsDays: Class[][];
	start: number;
	end: number;
	interval: number;
}

export default function Grid(props: GridProps) {
	const intervals = Math.ceil((props.end - props.start) / props.interval) + 1;

	return (
		<GridContainer>
			{props.subjectsDays.map((_, day) => (
				<DayContainer key={day}>
					{Array.from({ length: intervals }, (_, i) => (
						<IntervalLine key={i} />
					))}
				</DayContainer>
			))}
		</GridContainer>
	);
}
