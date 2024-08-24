"use client";

import styled from "styled-components";

export const ControlBar = styled.div`
	width: min(60rem, 100%);
	padding: 1rem;
	margin: auto;

	display: flex;
	flex-direction: row;
	justify-content: center;

	button + .round {
		aspect-ratio: 1;
		font-size: 1.125rem;
		padding: 0.75rem;
	}

	.icon {
		font-size: 1rem;
	}
`;

export const ButtonsContainer = styled.div`
	width: 100%;

	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 1rem;

	button + .round {
		aspect-ratio: 1;
		font-size: 1.125rem;
		padding: 0.75rem;
	}

	.icon {
		font-size: 1rem;
	}
`;
