import { useModal } from "@/hooks/useModal";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

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
				<p>Formulario</p>
			</Modal>
		</ControlBar>
	);
}
