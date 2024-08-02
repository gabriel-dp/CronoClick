"use client";

import styled from "styled-components";

export const CardList = styled.div`
	width: min(100%, 40rem);

	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

export const DayGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	.date {
		font-weight: bold;
	}
`;

export const TaskCard = styled.div<{ $color: string }>`
	border: 1px solid ${(props) => props.theme.primary};
	padding: 0.75rem 1rem;
	border-radius: 0.5rem;

	position: relative;
	overflow: hidden;

	&::before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 0.375rem;
		background-color: ${(props) => props.$color};
	}
`;

export const TaskCardData = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;

	.subject {
		font-size: 0.75rem;
	}

	.task {
		font-size: 1rem;
	}
`;
