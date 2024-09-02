"use client";

import styled from "styled-components";

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

export const Input = styled.input`
	padding: 0.5rem 1rem;
	border-radius: 100rem;
	border: 1px solid ${(props) => props.theme.dark};
	text-overflow: ellipsis;
`;
