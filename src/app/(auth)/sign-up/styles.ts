"use client";

import styled from "styled-components";

export const SignUpContainer = styled.div`
	width: min(100%, 25rem);
	border: 1px solid ${(props) => props.theme.primary};
	border-radius: 0.75rem;
	padding: 2rem 1.5rem;
	margin: auto;

	display: flex;
	align-items: center;
	justify-content: center;
`;
