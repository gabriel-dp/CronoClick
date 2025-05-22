"use client";

import styled from "styled-components";

export const HomeMainContainer = styled.main`
	& > * {
		margin: auto;
		margin-top: 2rem;
	}
		h1 {
		color: ${(props) => props.theme.primary};
		font-size: 2.5rem;
	}

	p {
		font-size: 1.25rem;
		color: ${(props) => props.theme.text};
	}
`;
