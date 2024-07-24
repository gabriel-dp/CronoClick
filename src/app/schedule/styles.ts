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

export const ScheduleContainer = styled(SectionContainer)``;

export const TasksContainer = styled(SectionContainer)``;
