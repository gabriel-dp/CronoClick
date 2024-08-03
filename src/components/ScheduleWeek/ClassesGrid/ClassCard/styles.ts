"use client";

import styled from "styled-components";

interface CardContainerProps {
	$color: string;
}

export const CardContainer = styled.div<CardContainerProps>`
	width: 100%;
	height: 100%;
	border-radius: 0.5rem;
	text-align: center;
	background-color: ${(props) => props.$color};
	border: 1px solid ${(props) => props.theme.primary}77;
	font-size: 0.75rem;
	overflow: hidden;
	cursor: pointer;
	transition: all 0.25s ease-in-out;

	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	.title {
		font-weight: bold;
		padding: 0.75rem;
		padding-bottom: 0;
		// overflow: hidden;
		// text-overflow: ellipsis;
		// white-space: nowrap;
	}

	.teacher {
	}

	&:hover {
		border: 1px solid ${(props) => props.theme.primary}AA;
		filter: drop-shadow(0 0 0.5rem ${(props) => props.theme.primary}44);
	}
`;
