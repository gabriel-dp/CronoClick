"use client";

import styled from "styled-components";

export const RowContainer = styled.div.attrs({ className: "days" })`
	width: 100%;

	display: flex;
	flex-direction: row;
`;

export const DayTitle = styled.div`
	width: 100%;
	font-size: 0.75rem;
	text-align: center;
`;
