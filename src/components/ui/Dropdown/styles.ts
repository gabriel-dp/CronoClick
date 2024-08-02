"use client";

import styled from "styled-components";

export const DropdownWrapper = styled.div`
	max-width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

export const DropdownLabel = styled.label`
	text-align: left;
	font-size: 1rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const SelectComponent = styled.select`
	padding: 0.5rem 1rem;
	border-radius: 100rem;
	background-color: white;
	border: 1px solid ${(props) => props.theme.dark}AA;
	background-color: white;

	background-image: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>");
	background-repeat: no-repeat;
	background-position: calc(100% - 1rem) center !important;
	-moz-appearance: none !important;
	-webkit-appearance: none !important;
	appearance: none !important;
	padding-right: 2rem !important;
`;

export const OptionComponent = styled.option``;
