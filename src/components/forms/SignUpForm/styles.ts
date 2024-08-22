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
	}

	button {
		margin-top: 1rem;
	}
`;
