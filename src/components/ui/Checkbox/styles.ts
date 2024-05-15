"use client";

import styled from "styled-components";

export const CheckboxWrapper = styled.div<{
	$alignment: string;
	$small: boolean;
}>`
	display: flex;
	flex-direction: ${(props) =>
		props.$alignment == "horizontal" ? "row" : "column"};
	justify-content: center;
	align-items: center;
	gap: ${(props) => (props.$small ? 0.25 : 0.75)}rem;
`;

export const CheckboxLabel = styled.label<{ $small: boolean }>`
	font-size: ${(props) => (props.$small ? 0.75 : 1)}rem;
`;

export const InputCheckbox = styled.input.attrs({
	type: "checkbox"
})``;
