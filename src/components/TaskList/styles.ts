"use client";

import styled from "styled-components";

export const CardList = styled.div`
	width: min(100%, 40rem);
	margin-bottom: 2rem;

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

export const TaskCard = styled.div<{ $color: string; $finished: string }>`
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

	.subject {
		opacity: ${(props) => (props.$finished == "true" ? 0.5 : 0.75)};
	}

	.task {
		text-decoration: ${(props) =>
			props.$finished == "true" ? "line-through" : "normal"};
		opacity: ${(props) => (props.$finished == "true" ? 0.5 : 1)};
	}
`;

export const TaskCardData = styled.div`
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.subject {
		font-size: 0.75rem;
	}

	.task {
		min-height: 1.5rem;
		font-size: 1rem;

		display: flex;
		flex-direction: column-reverse;
	}
`;
