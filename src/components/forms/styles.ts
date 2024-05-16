"use client";

import styled from "styled-components";

export const FormContainer = styled.form`
	width: min(20rem, 100%);
	margin: 0 auto;
	padding-bottom: 1rem;

	display: flex;
	flex-direction: column;
	gap: 1rem;

	h1 {
		font-size: 1.5rem;
		color: ${(props) => props.theme.primary};
		margin-bottom: 0.5rem;
	}

	hr {
		border: 1px solid ${(props) => props.theme.primary};
		border-top: none;
	}
`;

export const FormRow = styled.div.attrs({
	className: "row"
})`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1rem;

	& > * {
		flex: 1;
	}
`;

export const FormGroup = styled.div`
	border-radius: 0.5rem;
	border: 1px solid ${(props) => props.theme.primary};
	overflow: hidden;
	padding-bottom: 1rem;

	display: flex;
	flex-direction: column;
	gap: 1rem;

	h2 {
		font-size: 1rem;
	}

	.row {
		padding: 0 1rem;

		label {
			font-size: 0.75rem;
		}
	}
`;

export const FormHead = styled.div`
	background-color: ${(props) => props.theme.primary};
	color: ${(props) => props.theme.primaryText};
	padding: 0.5rem 1rem;
	min-height: 2rem;
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	button {
		height: 2rem;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}
`;
