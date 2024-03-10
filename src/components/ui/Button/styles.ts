"use client";

import styled from "styled-components";

export const ButtonComponent = styled.button`
	padding: 0.5rem 1rem;
	border-radius: 100rem;
	border: none;
	background-color: ${(props) => props.theme.primary};
	color: ${(props) => props.theme.primaryText};
	cursor: pointer;

	&:hover {
		background-color: ${(props) => props.theme.primaryHighlight};
	}
`;
