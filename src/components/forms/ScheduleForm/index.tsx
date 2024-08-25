import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaTrash as DeleteIcon } from "react-icons/fa6";

import { Id, Schedule } from "@/types/schedules";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import { apiRequest, useApiRequest } from "@/hooks/useApiRequest";
import { FormContainer, FormRow } from "@/components/forms/styles";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

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

	const session = useSession();

	const { data: userSchedules, execute: refreshList } = useApiRequest<
		Schedule[]
	>(`schedules/fromUser/${session?.data?.id}`, {
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
		changeDelay(newName, 750);
	}

	function handleDeleteSchedule(id: Id) {
		if (props.current.id == id) return;
		console.log(props.current.id, id);
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
				label="Editar nome do atual"
				name="schedule-name"
				value={scheduleName}
				onChange={(event) => handleEditName(event.target.value)}
			/>
			<hr />
			{!userSchedules ? (
				<p>Nenhum calendário encontrado</p>
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
							<Button
								onClick={() =>
									handleDeleteSchedule(schedule.id)
								}
								stopPropagation
							>
								<DeleteIcon className="icon" />
							</Button>
						</ScheduleData>
					</FormRow>
				))
			)}
			<Button onClick={handleCreateNewSchedule}>Criar novo</Button>
			<hr />
			<Button onClick={props.finally}>Fechar</Button>
		</FormContainer>
	);
}
