"use client";

import styled from "styled-components";

export const HeaderContainer = styled.header`
	width: 100%;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 10;

	padding: 1rem 2rem;
	border-bottom: 1px solid ${(props) => props.theme.primary}22;
	background-color: ${(props) => props.theme.background};
	filter: drop-shadow(0 0 0.5rem #00000011);

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	h1 {
		font-size: 1.5rem;
		color: ${(props) => props.theme.primary};
	}
`;

export const OptionsContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;

	& > div {
		min-height: 2.5rem;

		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}

	.button-transparent {
		background-color: transparent;
		color: ${(props) => props.theme.primary};
		transition: all 0.125s ease-in-out;

		&:hover {
			background-color: ${(props) => props.theme.primary};
			color: ${(props) => props.theme.primaryText};
		}
	}

	.user {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;

		.icon {
			font-size: 1.25rem;
		}
	}
`;
