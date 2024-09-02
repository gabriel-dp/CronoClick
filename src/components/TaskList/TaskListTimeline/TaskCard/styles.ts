"use client";

import Button from "@/components/ui/Button";

import styled from "styled-components";

export const CardContainer = styled.div<{ $color: string; $finished: string }>`
	border-radius: 0.5rem;
	padding: 0.75rem 1.25rem;
	border: 1px solid ${(props) => props.theme.primary}44;
	cursor: pointer;
	transition: all 0.125s ease-in-out;
	position: relative;

	&::before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 0.375rem;
		background-color: ${(props) => props.$color};
		border-radius: 0.5rem 0 0 0.5rem;
		border-right: 1px solid ${(props) => props.theme.primary}22;
		transition: all 0.125s ease-in-out;
	}

	&:hover {
		padding-left: 1.5rem;
		border-color: ${(props) => props.theme.primary}66;
		&::before {
			width: 0.625rem;
		}
	}

	.subject {
		opacity: ${(props) => (props.$finished == "true" ? 0.5 : 0.75)};
	}

	.task {
		text-decoration: ${(props) =>
			props.$finished == "true" ? "line-through" : "normal"};
		opacity: ${(props) => (props.$finished == "true" ? 0.5 : 1)};
	}
`;

export const CardData = styled.div`
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.subject {
		font-size: 0.75rem;
	}

	.task {
		min-height: 1.5rem;
		font-size: 1rem;

		display: flex;
		flex-direction: column-reverse;
	}
`;

export const AddNoteButton = styled(Button)`
	background-color: transparent;
	color: ${(props) => props.theme.primary};
	border: 1px solid ${(props) => props.theme.primary}44;
	transition: all 0.125s ease-in-out;

	border-top: 0;
	padding: 0.5rem;
	padding-top: 0.2rem;
	border-radius: 0;
	border-bottom-left-radius: 1rem;
	border-bottom-right-radius: 1rem;

	position: absolute;
	top: 100%;
	left: 50%;
	transform: translateX(-50%);

	&:hover {
		background-color: ${(props) => props.theme.primary};
		color: ${(props) => props.theme.primaryText};
	}
`;

export const NotesContainer = styled.div`
	width: 100%;
	cursor: auto;

	display: flex;
	flex-direction: column;
	gap: 0.25rem;

	& > :first-child {
		margin-top: 0.5rem;
	}
`;

export const NoteCard = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;

	& > * {
		flex: 1;
	}

	textarea {
		border-radius: 0.5rem;
		border-color: ${(props) => props.theme.primary}44;
		transition: all 0.25s ease-in-out;

		&:focus {
			border-color: ${(props) => props.theme.primary}66;
			filter: drop-shadow(0 0 0.5rem #00000011);
		}
	}

	button {
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
		flex: none;
		transition: all 0.125s ease-in-out;

		background-color: transparent;
		color: ${(props) => props.theme.primary};
		font-size: 1rem;

		&:hover {
			background-color: ${(props) => props.theme.primary};
			color: ${(props) => props.theme.primaryText};
		}
	}
`;
