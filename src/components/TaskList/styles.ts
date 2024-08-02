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
	border-radius: 0.5rem;
	padding: 0.75rem 1.25rem;
	border: 1px solid ${(props) => props.theme.primary}44;
	cursor: pointer;
	transition: all 0.125s ease-in-out;

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
		border-right: 1px solid ${(props) => props.theme.primary}22;
		transition: all 0.125s ease-in-out;
	}

	&:hover {
		padding-left: 1.5rem;
		border-color: ${(props) => props.theme.primary}66;
		&::before {
			width: 0.625rem;
		}
	}
`;

export const TaskCardData = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;

	.subject {
		opacity: 0.5;
		font-size: 0.75rem;
	}

	.task {
		min-height: 1.5rem;
		font-size: 1rem;

		display: flex;
		flex-direction: column-reverse;
	}
`;
