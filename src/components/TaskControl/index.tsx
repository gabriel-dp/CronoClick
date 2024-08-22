import { ScheduleControlI } from "@/utils/scheduleUtils";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import TaskForm from "@/components/forms/TaskForm";

import { ControlBar } from "./styles";

interface TaskControlI {
	controls: ScheduleControlI;
}

export default function TaskControl(props: TaskControlI) {
	const addTaskModal = useModal();

	return (
		<ControlBar>
			<Button onClick={addTaskModal.open}>Adicionar Tarefa</Button>
			<Modal {...addTaskModal}>
				<TaskForm
					controls={props.controls}
					finally={addTaskModal.close}
				/>
			</Modal>
		</ControlBar>
	);
}
