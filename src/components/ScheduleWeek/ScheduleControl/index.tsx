import { exportComponentAsPNG } from "react-component-export-image";
import { FaPlus as AddIcon } from "react-icons/fa6";
import { FaGear as SettingsIcon } from "react-icons/fa6";
import { FaDownload as DownloadIcon } from "react-icons/fa6";

import { Schedule } from "@/types/schedules";
import { Configs } from "@/types/configs";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import { useModal } from "@/hooks/useModal";
import SubjectForm from "@/components/forms/SubjectForm";
import ConfigsForm from "@/components/forms/ConfigsForm";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import { ControlBar, ButtonsContainer } from "./styles";

interface ScheduleControlProps {
	schedule: Schedule;
	controls: ScheduleControlI;
	configs: Configs;
	setConfigs: React.Dispatch<React.SetStateAction<Configs>>;
	gridRef: React.MutableRefObject<HTMLDivElement | null>;
}

export default function ScheduleControl(props: ScheduleControlProps) {
	const addSubjectModal = useModal();
	const configsModal = useModal();

	function exportComponent() {
		exportComponentAsPNG(props.gridRef, { fileName: "schedule" });
	}

	return (
		<ControlBar>
			<ButtonsContainer>
				<Button onClick={addSubjectModal.open}>
					<AddIcon className="icon" /> &nbsp; Disciplina
				</Button>
				<Button className="round" onClick={exportComponent}>
					<DownloadIcon className="icon" />
				</Button>
				<Button className="round" onClick={configsModal.open}>
					<SettingsIcon className="icon" />
				</Button>
			</ButtonsContainer>
			<Modal {...addSubjectModal}>
				<SubjectForm
					controls={props.controls}
					finally={addSubjectModal.close}
				/>
			</Modal>
			<Modal {...configsModal}>
				<ConfigsForm
					configs={props.configs}
					setConfigs={props.setConfigs}
					finally={configsModal.close}
				/>
			</Modal>
		</ControlBar>
	);
}
