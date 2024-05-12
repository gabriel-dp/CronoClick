"use client";

import { ScheduleControlI } from "@/hooks/useSchedule";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/ui/Button";
import SubjectForm from "@/components/forms/SubjectForm";
import Modal from "@/components/ui/Modal";

import { ControlBar } from "./styles";

interface ScheduleControlProps {
	controls: ScheduleControlI;
	saveChanges: () => void;
}

export default function ScheduleControl(props: ScheduleControlProps) {
	const addSubjectModal = useModal();

	return (
		<ControlBar>
			<Button onClick={addSubjectModal.open}>Adicionar disciplina</Button>
			<Button onClick={props.saveChanges}>Salvar alterações</Button>
			<Modal {...addSubjectModal}>
				<SubjectForm
					controls={props.controls}
					finally={addSubjectModal.close}
				/>
			</Modal>
		</ControlBar>
	);
}
