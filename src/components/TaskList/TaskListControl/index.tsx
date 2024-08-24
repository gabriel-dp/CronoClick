import { FaPlus as AddIcon } from "react-icons/fa6";
import { FaList as CheckedOffIcon } from "react-icons/fa6";
import { FaListCheck as CheckedOnIcon } from "react-icons/fa6";

import { Configs } from "@/types/configs";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import { useModal } from "@/hooks/useModal";
import TaskForm from "@/components/forms/TaskForm";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import { ButtonsContainer, ControlBar } from "./styles";

interface TaskControlI {
	controls: ScheduleControlI;
	configs: Configs;
	setConfigs: React.Dispatch<React.SetStateAction<Configs>>;
}

export default function TaskControl(props: TaskControlI) {
	const addTaskModal = useModal();

	function handleToggleHideButton() {
		props.setConfigs((prev) => ({
			...prev,
			hideFinishedTasks: !prev.hideFinishedTasks
		}));
	}

	return (
		<ControlBar>
			<ButtonsContainer>
				<Button onClick={addTaskModal.open}>
					<AddIcon className="icon" /> &nbsp; Tarefa
				</Button>
				<Button className="round" onClick={handleToggleHideButton}>
					{props.configs.hideFinishedTasks ? (
						<CheckedOnIcon className="icon" />
					) : (
						<CheckedOffIcon className="icon" />
					)}
				</Button>
			</ButtonsContainer>
			<Modal {...addTaskModal}>
				<TaskForm
					controls={props.controls}
					finally={addTaskModal.close}
				/>
			</Modal>
		</ControlBar>
	);
}
