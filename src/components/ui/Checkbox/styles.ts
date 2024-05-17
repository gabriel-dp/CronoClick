"use client";

import styled from "styled-components";

export const CheckboxLabel = styled.label<{
	$alignment: string;
	$small: boolean;
}>`
	font-size: ${(props) => (props.$small ? 0.75 : 1)}rem;

	display: flex;
	flex-direction: ${(props) =>
		props.$alignment == "horizontal" ? "row" : "column"};
	justify-content: center;
	align-items: center;
	gap: ${(props) => (props.$small ? 0.25 : 0.75)}rem;
`;

export const InputCheckbox = styled.input.attrs({
	type: "checkbox"
})`
	cursor: pointer;
`;
