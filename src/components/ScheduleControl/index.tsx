"use client";

import { Configs } from "@/types/configs";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import SubjectForm from "@/components/forms/SubjectForm";
import ConfigsForm from "@/components/forms/ConfigsForm";

import { ControlBar } from "./styles";

interface ScheduleControlProps {
	controls: ScheduleControlI;
	configs: Configs;
	setConfigs: (newConfigs: Configs) => void;
}

export default function ScheduleControl(props: ScheduleControlProps) {
	const addSubjectModal = useModal();
	const configsModal = useModal();

	return (
		<ControlBar>
			<Button onClick={addSubjectModal.open}>Adicionar disciplina</Button>
			<Button onClick={configsModal.open}>Configurações</Button>
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
