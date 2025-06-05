import styled from "styled-components";

export const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 1rem;
	background-color: var(--background-secondary);
	border-radius: 0.5rem;
	margin: 1rem 0;
`;

export const SubjectItem = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem;
	cursor: pointer;
	border-radius: 0.25rem;
	transition: background-color 0.2s;

	&:hover {
		background-color: var(--background-tertiary);
	}

	span {
		font-size: 1rem;
		color: var(--text-primary);
	}
`;

export const ColorBox = styled.div`
	width: 1rem;
	height: 1rem;
	border-radius: 0.25rem;
	border: 1px solid var(--border);
`;
