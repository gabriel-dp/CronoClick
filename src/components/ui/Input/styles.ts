"use client";

import styled from "styled-components";

export const InputWrapper = styled.div`
	max-width: 100%;
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
	border: 1px solid ${(props) => props.theme.dark}AA;
	text-overflow: ellipsis;
`;
