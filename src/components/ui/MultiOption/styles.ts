"use client";

import styled from "styled-components";

export const MultiOptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const OptionsContainerLabel = styled.p`
	text-align: center;
`;

export const OptionsContainer = styled.div`
	border: 1px solid ${(props) => props.theme.primary};
	border-radius: 0.25rem;
	overflow: hidden;

	display: flex;
	flex-direction: row;

	& > * {
		border-right: 1px solid ${(props) => props.theme.primary};
		&:last-child {
			border-right: none;
		}
	}
`;

export const Option = styled.input.attrs({
	type: "radio"
})`
	visibility: hidden;
`;

export const OptionLabel = styled.label`
	width: 100%;
	padding: 0.5rem 0;
	cursor: pointer;
	user-select: none;

	&:has(input[type="radio"]:checked) {
		background-color: ${(props) => props.theme.primary};
		color: ${(props) => props.theme.primaryText};
	}
`;
