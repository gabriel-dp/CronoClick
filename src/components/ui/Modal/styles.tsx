"use client";

import styled from "styled-components";

export const MODAL_TRANSITION_TIME_MS = 250;

export const BackgroundFilter = styled.div<{ $isOpen: string }>`
	position: fixed;
	inset: 0;
	z-index: 3;
	background-color: ${(props) => props.theme.background}55;
	backdrop-filter: blur(10px);

	visibility: ${(props) => (props.$isOpen == "true" ? "visible" : "hidden")};
	opacity: ${(props) => (props.$isOpen == "true" ? "1" : "0")};
	transition:
		visibility ${MODAL_TRANSITION_TIME_MS}ms ease-in-out,
		opacity ${MODAL_TRANSITION_TIME_MS}ms ease-in-out;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ModalContainer = styled.div`
	max-height: calc(100% - 3rem);
	width: min(calc(100% - 2rem), 30rem);
	border-radius: 0.5rem;
	padding: 1.5rem;
	padding-top: 2.5rem;
	background-color: ${(props) => props.theme.background};
	border: 1px solid ${(props) => props.theme.primary};
	overflow-y: auto;
	position: relative;
	text-align: center;

	.close-button {
		background: transparent;
		color: ${(props) => props.theme.primary};
		font-size: 1rem;
		font-weight: bold;
	}

	scrollbar-gutter: stable;
	&::-webkit-scrollbar {
		width: 5px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 100rem;
		background: ${(props) => props.theme.primary};
	}

	&::-webkit-scrollbar-thumb:hover {
		background: ${(props) => props.theme.primaryHighlight};
	}
`;

export const CloseButtonContainer = styled.div`
	position: absolute;
	top: 1rem;
	right: 1rem;
`;
