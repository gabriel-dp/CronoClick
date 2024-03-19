"use client";

import styled from "styled-components";

export const GridContainer = styled.div.attrs({ className: "grid" })`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: row;
`;

export const DayContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 0.5rem 0;

	border-left: 1px solid gray;
	&:last-child {
		border-right: 1px solid gray;
	}

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const IntervalLine = styled.hr`
	border: 1px solid lightgray;
	border-bottom: none;
`;
