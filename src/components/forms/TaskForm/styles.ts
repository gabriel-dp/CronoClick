"use client";

import styled from "styled-components";

export const AttachmentsList = styled.ul`
	list-style: none;
	margin: 1rem 0;

	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	li {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		justify-content: space-between;

		div {
			display: flex;
			flex-direction: row;
			gap: 0.25rem;
			overflow: hidden;
		}

		.filename {
			text-overflow: ellipsis;
			flex: 1;
			max-width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-align: left;
		}
	}
`;
