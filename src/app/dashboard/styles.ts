import styled from "styled-components";

export const DashboardContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: calc(100vh - 4rem);
	padding: 2rem;
	text-align: center;
	gap: 2rem;

	h1 {
		color: ${(props) => props.theme.primary};
		font-size: 2.5rem;
	}

	p {
		font-size: 1.25rem;
		color: ${(props) => props.theme.text};
	}
`;
