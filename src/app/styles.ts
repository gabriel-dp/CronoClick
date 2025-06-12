"use client";

import styled from "styled-components";

import Logo from "@/assets/logo.svg";

export const StyledLogo = styled(Logo)`
	width: 100px;
	height: auto;
	margin-bottom: 1rem;
`;

export const HomeMainContainer = styled.main`
	min-height: calc(100dvh - 9rem);
	padding: 2rem;
	text-align: center;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2rem;

	h1 {
		color: ${(props) => props.theme.primary};
		font-size: 2.5rem;
	}

	p {
		font-size: 1.25rem;
		color: ${(props) => props.theme.text};
	}

	button {
		padding: 1.25rem 2rem;
		font-size: 1rem;
		font-weight: bold;
	}
`;
