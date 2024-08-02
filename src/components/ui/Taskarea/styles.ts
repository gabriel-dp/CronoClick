"use client";

import styled from "styled-components";

export const TextareaWrapper = styled.div`
	max-width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

export const TextareaLabel = styled.label`
	text-align: left;
	font-size: 1rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const TextareaComponent = styled.textarea`
	width: 100%;
	border: 1px solid ${(props) => props.theme.dark}AA;
	padding: 0.5rem 1rem;
	border-radius: 1rem;
	resize: vertical;
	max-height: 6rem;
	min-height: 2.5rem;
`;