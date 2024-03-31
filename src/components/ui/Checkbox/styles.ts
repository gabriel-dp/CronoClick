"use client";

import styled from "styled-components";

export const CheckboxWrapper = styled.div<{ $alignment: string }>`
	display: flex;
	flex-direction: ${(props) =>
		props.$alignment == "horizontal" ? "row" : "column"};
	justify-content: center;
	align-items: center;
	gap: 0.25rem;
`;

export const CheckboxLabel = styled.label`
	font-size: 0.75rem;
`;

export const InputCheckbox = styled.input.attrs({
	type: "checkbox"
})``;
