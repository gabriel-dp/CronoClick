"use client";

import styled from "styled-components";

export const MainContainer = styled.main`
	width: 100%;
	padding-top: 1.5rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
`;

export const SectionTitle = styled.h1`
	font-size: 2rem;
	color: ${(props) => props.theme.primary};
`;

export const SectionContainer = styled.section`
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
`;

export const ScheduleContainer = styled(SectionContainer)`
	padding: 1.5rem 0;
`;

export const TasksContainer = styled(SectionContainer)`
	padding-top: 2rem;
	border-top: 1px solid ${(props) => props.theme.primary}44;
`;
