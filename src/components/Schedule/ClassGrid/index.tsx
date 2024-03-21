import { Class } from "@/types/schedule";

import { DayContainer, GridContainer, IntervalLine, TimeSpan } from "./styles";
import ClassCard from "./ClassCard";

interface GridProps {
	subjectsDays: Class[][];
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
			{props.subjectsDays.map((classes, day) => (
				<DayContainer key={day}>
					{Array.from({ length: intervals }, (_, i) => (
						<IntervalLine key={i} />
					))}
					{classes.map((clasa) => (
						<TimeSpan
							key={clasa.start + clasa.id}
							startPercentage={percentageRatio(clasa.start)}
							endPercentage={percentageRatio(clasa.end)}
						>
							<ClassCard class={clasa} />
						</TimeSpan>
					))}
				</DayContainer>
			))}
		</GridContainer>
	);
}
