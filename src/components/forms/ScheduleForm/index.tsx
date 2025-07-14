"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaTrash as DeleteIcon } from "react-icons/fa6";

import { Id, Schedule } from "@/types/schedules";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import { useModal } from "@/hooks/useModal";
import { apiRequest, useApiRequest } from "@/hooks/useApiRequest";
import ConfirmDeleteForm from "@/components/forms/ConfirmDeleteForm";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { FormContainer, FormRow } from "@/components/forms/styles";

import { ScheduleData } from "./styles";

interface ScheduleFormProps {
	current: Schedule;
	controls: ScheduleControlI;
	finally: () => void;
	changeSchedule: (id: Id) => void;
}

export default function ScheduleForm(props: ScheduleFormProps) {
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
	const [scheduleName, setScheduleName] = useState(props.current.name);

	const confirmDeleteScheduleModal = useModal();
	const [scheduleToDelete, setScheduleToDelete] = useState<Id | null>(null);

	const session = useSession();

	const {
		data: userSchedules,
		execute: refreshList,
		status: requestStatus
	} = useApiRequest<Schedule[]>(`schedules/fromUser/${session?.data?.id}`, {
		method: "GET",
		body: {},
		immediate: session.status == "authenticated"
	});

	useEffect(() => {
		setScheduleName(props.current.name);
	}, [props, userSchedules]);

	function changeDelay(text: string, time: number) {
		if (timer) {
			clearTimeout(timer);
			setTimer(null);
		}
		setTimer(
			setTimeout(() => {
				props.controls.editName(text);
			}, time)
		);
	}

	function handleEditName(newName: string) {
		setScheduleName(newName);
		changeDelay(newName, 1000);
	}

	function handleDeleteSchedule(id: Id) {
		if (props.current.id == id) return;
		apiRequest<Schedule, Schedule>(
			`schedules/${id}`,
			"DELETE",
			{},
			{
				actionError: () => refreshList(),
				actionSuccess: () => refreshList()
			}
		);
	}

	function handleChangeSchedule(id: Id) {
		props.changeSchedule(id);
		props.finally();
	}

	function handleCreateNewSchedule() {
		apiRequest<Schedule, Schedule>(
			`schedules/fromUser/${session.data?.id}`,
			"POST",
			{ name: "Novo Cronograma" },
			{
				actionError: () => refreshList(),
				actionSuccess: () => refreshList()
			}
		);
	}

	return (
		<FormContainer>
			<h1>Cronogramas</h1>
			<Input
				label="Editar nome do cronograma atual"
				name="schedule-name"
				value={scheduleName}
				onChange={(event) => handleEditName(event.target.value)}
			/>
			<hr />
			{!userSchedules ? (
				requestStatus === "loading" ? (
					<p>Carregando...</p>
				) : (
					<p>Nenhum calendário encontrado</p>
				)
			) : (
				userSchedules?.map((schedule) => (
					<FormRow key={schedule.id}>
						<ScheduleData
							onClick={() => handleChangeSchedule(schedule.id)}
						>
							<span>
								{schedule.id == props.current.id
									? scheduleName
									: schedule.name}
							</span>
							{schedule.id != props.current.id && (
								<Button
									onClick={() => {
										setScheduleToDelete(schedule.id);
										confirmDeleteScheduleModal.open();
									}}
									stopPropagation
								>
									<DeleteIcon className="icon" />
								</Button>
							)}
						</ScheduleData>
					</FormRow>
				))
			)}
			<Button onClick={handleCreateNewSchedule}>Criar novo</Button>
			<hr />
			<Button onClick={props.finally}>Fechar</Button>
			<Modal {...confirmDeleteScheduleModal}>
				<ConfirmDeleteForm
					onCancel={confirmDeleteScheduleModal.close}
					onConfirm={() => {
						handleDeleteSchedule(scheduleToDelete!);
						confirmDeleteScheduleModal.close();
					}}
					title="Deletar cronograma?"
					description={
						<>
							Tem certeza que deseja deletar este cronograma?
							<br />
							Esta ação não poderá ser desfeita.
						</>
					}
				/>
			</Modal>
		</FormContainer>
	);
}
