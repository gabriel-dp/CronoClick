"use client";

import styled from "styled-components";

export const InputWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

export const InputLabel = styled.label`
	text-align: left;
	font-size: 1rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const InputComponent = styled.input`
	width: 100%;
	padding: 0.5rem 1rem;
	border-radius: 100rem;
	border: 1px solid var(--border-color);
	text-overflow: ellipsis;

	&:focus {
		outline: none;
		border-color: var(--primary-color);
	}

	&::placeholder {
		color: var(--text-color-light);
	}
`;

export const ErrorMessage = styled.p`
	color: #ff4d4d;
	font-size: 0.75rem;
	margin: 0;
	margin-top: 0.25rem;
`;
