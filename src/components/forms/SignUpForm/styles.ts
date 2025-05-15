"use client";

import styled from "styled-components";

export const ErrorMessage = styled.span`
	color: #ff4444;
	font-size: 0.875rem;
	margin-top: -0.5rem;
	margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
	color: red;
`;

export const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	text-align: center;
	gap: 0.75rem;

	h1 {
		margin-bottom: 1rem;
		color: ${(props) => props.theme.primary};
	}

	button {
		margin-top: 1rem;
		padding: 0.75rem;
	}

	hr {
		margin: 0.5rem 0;
		border: 1px solid ${(props) => props.theme.primary}AA;
		border-top: 0;
	}

	a {
		color: ${(props) => props.theme.primary};
	}
`;
