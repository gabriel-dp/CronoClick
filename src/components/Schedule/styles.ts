"use client";

import styled from "styled-components";

export const ScheduleContainer = styled.div`
	width: min(100%, 50rem);
	height: 40rem;
	padding: 1rem;

	display: grid;
	grid-template-columns: min-content minmax(25rem, 1fr);
	grid-template-rows: min-content 1fr;

	.days {
		padding-bottom: 0.5rem;
	}

	.time {
		padding-right: 1rem;
		position: sticky;
		left: 0;
	}

	.empty {
		background-color: ${(props) => props.theme.background};
		z-index: 1;
		position: sticky;
		left: 0;
	}
`;
