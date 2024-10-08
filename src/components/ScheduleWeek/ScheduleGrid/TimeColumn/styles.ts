"use client";

import styled from "styled-components";

export const ColumnContainer = styled.div.attrs({ className: "time" })`
	height: 100%;
	font-size: 0.75rem;
	background-color: ${(props) => props.theme.background};
	z-index: 1;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const TimeContainer = styled.div`
	white-space: nowrap;
	text-transform: uppercase;
`;
