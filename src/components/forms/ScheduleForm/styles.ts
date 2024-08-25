"use client";

import styled from "styled-components";

export const ScheduleData = styled.div`
	border: 1px solid ${(props) => props.theme.primary}AA;
	border-radius: 100rem;
	padding-left: 1.25rem;
	cursor: pointer;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	button {
		aspect-ratio: 1;
		font-size: 1.125rem;
		padding: 0.75rem;

		.icon {
			font-size: 1rem;
		}
	}
`;
