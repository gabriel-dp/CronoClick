"use client";

import styled from "styled-components";

export const CardList = styled.div`
	width: min(100%, 40rem);
	margin-bottom: 2rem;
	padding: 0 1.5rem;

	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	.empty {
		text-align: center;
		opacity: 0.75;
	}
`;

export const DayGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	.date {
		font-weight: bold;
	}
`;
