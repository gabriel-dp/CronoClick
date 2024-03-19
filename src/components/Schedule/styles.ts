"use client";

import styled from "styled-components";

export const ScheduleContainer = styled.div`
	width: 100%;
	height: 30rem;
	padding: 1rem;

	display: grid;
	grid-template-columns: min-content 1fr;
	grid-template-rows: min-content 1fr;

	.days {
		padding-bottom: 0.5rem;
	}

	.time {
		padding-right: 1rem;
	}
`;
