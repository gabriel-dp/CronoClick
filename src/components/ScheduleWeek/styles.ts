"use client";

import styled from "styled-components";

export const ScheduleContainer = styled.div`
	width: min(100%, 70rem);
	height: clamp(35rem, calc(100dvh - 5rem), 45rem);
	padding: 1rem 0;
	margin: auto;
	overflow-x: auto;

	display: grid;
	grid-template-columns: min-content minmax(55rem, 1fr);
	grid-template-rows: min-content 1fr;

	.empty {
		width: 100%;
		height: 100%;
		background: ${(props) => props.theme.background};
		border-right: 1px dashed gray;

		position: sticky;
		left: 0;
		z-index: 1;
	}

	.time {
		padding: 0 1rem;
		border-right: 1px solid gray;

		position: sticky;
		left: 0;
		z-index: 1;
	}

	.days {
		padding-bottom: 0.5rem;
		padding-right: 1rem;
	}

	.grid {
		padding-right: 1rem;
	}
`;
