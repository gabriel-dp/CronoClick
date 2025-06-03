"use client";

import styled from "styled-components";

export const GridContainer = styled.div.attrs({ className: "grid" })`
	width: 100%;
	height: 100%;
	padding: 0.375rem 0;

	display: flex;
	flex-direction: row;
`;

export const DayContainer = styled.div`
	width: 100%;
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&::before {
		content: "";
		position: absolute;
		inset: -0.25rem 0;

		border-right: 1px solid gray;
	}
`;

export const IntervalLine = styled.hr`
	border: 1px solid lightgray;
	border-bottom: none;
`;

interface TimeSpanProps {
	$startPercentage: number;
	$endPercentage: number;
}

export const TimeSpan = styled.div<TimeSpanProps>`
	width: 90%;
	height: ${(props) => props.$endPercentage - props.$startPercentage}%;
	position: absolute;
	top: ${(props) => props.$startPercentage}%;
	left: 50%;
	transform: translateX(-50%);

	&:hover {
		position: absolute;
		z-index: 2;
	}
`;
