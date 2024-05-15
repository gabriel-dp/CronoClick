"use client";

import { Configs } from "@/types/configs";
import { ScheduleControlI } from "@/hooks/useSchedule";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import SubjectForm from "@/components/forms/SubjectForm";
import ScheduleConfigsForm from "@/components/forms/ScheduleConfigsForm";

import { ControlBar } from "./styles";

interface ScheduleControlProps {
	controls: ScheduleControlI;
	saveChanges: () => void;
	updateConfigs: (newConfigs: Configs) => void;
}

export default function ScheduleControl(props: ScheduleControlProps) {
	const addSubjectModal = useModal();
	const configsModal = useModal();

	return (
		<ControlBar>
			<Button onClick={addSubjectModal.open}>Adicionar disciplina</Button>
			<Button onClick={props.saveChanges}>Salvar alterações</Button>
			<Button onClick={configsModal.open}>Configurações</Button>
			<Modal {...addSubjectModal}>
				<SubjectForm
					controls={props.controls}
					finally={addSubjectModal.close}
				/>
			</Modal>
			<Modal {...configsModal}>
				<ScheduleConfigsForm
					initialConfigs={{} as Configs}
					updateConfigs={props.updateConfigs}
					finally={configsModal.close}
				/>
			</Modal>
		</ControlBar>
	);
}
