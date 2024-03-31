"use client";

import styled from "styled-components";

export const ScheduleContainer = styled.div`
	width: min(100%, 60rem);
	height: 30rem;
	padding: 1rem;
	padding-bottom: 2rem;
	margin: auto;
	overflow-x: auto;

	display: grid;
	grid-template-columns: min-content minmax(30rem, 1fr);
	grid-template-rows: min-content 1fr;

	.empty {
		background-color: ${(props) => props.theme.background};
	}

	.time {
		padding-right: 1rem;
	}

	.days {
		padding-bottom: 0.5rem;
	}
`;
