"use client";

import { useEffect, useState } from "react";

import { formatMinutesToTime } from "@/utils/timeUtils";

import { ColumnContainer, TimeContainer } from "./styles";

interface TimeColumnProps {
	start: number;
	end: number;
	interval: number;
}

export default function TimeColumn(props: TimeColumnProps) {
	const [times, setTimes] = useState<string[]>([]);

	// useEffect forces "formatMinutesToTime" to be called client-side only
	useEffect(() => {
		const intervals =
			Math.ceil((props.end - props.start) / props.interval) + 1;
		const minutesArray: number[] = Array.from({ length: intervals }).map(
			(_, i) => props.start + props.interval * i
		);

		setTimes(minutesArray.map((minutes) => formatMinutesToTime(minutes)));
	}, [props]);

	return (
		<ColumnContainer>
			{times.map((time, i) => (
				<TimeContainer key={i}>{time}</TimeContainer>
			))}
		</ColumnContainer>
	);
}
