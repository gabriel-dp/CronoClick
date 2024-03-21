"use client";

import styled from "styled-components";

export const CardContainer = styled.div`
	width: 100%;
	height: 100%;
	padding: 0.75rem;
	border-radius: 0.75rem;
	text-align: center;
	background-color: lightblue;
	border: 1px solid gray;
	font-size: 0.75rem;
	overflow: hidden;

	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	.title {
		font-weight: bold;
		// overflow: hidden;
		// text-overflow: ellipsis;
		// white-space: nowrap;
	}

	.teachers {
	}
`;
