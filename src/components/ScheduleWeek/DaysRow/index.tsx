import { DayTitle, RowContainer } from "./styles";

interface DaysRowProps {
	days: string[];
}

export default function DaysRow(props: DaysRowProps) {
	return (
		<RowContainer>
			{props.days.map((day, i) => (
				<DayTitle key={day + i}>{day}</DayTitle>
			))}
		</RowContainer>
	);
}
