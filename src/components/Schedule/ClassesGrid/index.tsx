import { Class } from "@/types/schedule";

import { DayContainer, GridContainer, IntervalLine, TimeSpan } from "./styles";
import ClassCard from "./ClassCard";

interface GridProps {
	weekClasses: Class[][];
	start: number;
	end: number;
	interval: number;
}

export default function Grid(props: GridProps) {
	const intervals = Math.ceil((props.end - props.start) / props.interval) + 1;

	function percentageRatio(value: number) {
		const ratio = (value - props.start) / (props.end - props.start);
		return ratio * 100;
	}

	return (
		<GridContainer>
			{props.weekClasses.map((dayClasses, day) => (
				<DayContainer key={day}>
					{Array.from({ length: intervals }, (_, i) => (
						<IntervalLine key={`${day}-${i}`} />
					))}
					{dayClasses.map((dayClass) => (
						<TimeSpan
							key={dayClass.start + dayClass.id}
							$startPercentage={percentageRatio(dayClass.start)}
							$endPercentage={percentageRatio(dayClass.end)}
						>
							<ClassCard class={dayClass} />
						</TimeSpan>
					))}
				</DayContainer>
			))}
		</GridContainer>
	);
}
