import { useModal } from "@/hooks/useModal";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import TaskForm from "@/components/forms/TaskForm";

import { ControlBar } from "./styles";

interface TaskControlI {
	saveChanges: () => void;
}

export default function TaskControl(props: TaskControlI) {
	const addTaskModal = useModal();

	return (
		<ControlBar>
			<Button onClick={addTaskModal.open}>Adicionar Tarefa</Button>
			<Button onClick={props.saveChanges}>Salvar alterações</Button>
			<Modal {...addTaskModal}>
				<TaskForm finally={addTaskModal.close} />
			</Modal>
		</ControlBar>
	);
}
