"use client";

import { ScheduleControlI } from "@/hooks/useSchedule";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/ui/Button";
import SubjectForm from "@/components/forms/SubjectForm";
import Modal from "@/components/ui/Modal";

import { ControlBar } from "./styles";

interface ScheduleControlProps {
	controls: ScheduleControlI;
}

export default function ScheduleControl({ controls }: ScheduleControlProps) {
	const addSubjectModal = useModal();

	return (
		<ControlBar>
			<Button onClick={addSubjectModal.open}>Adicionar disciplina</Button>
			<Modal {...addSubjectModal}>
				<SubjectForm
					controls={controls}
					finally={addSubjectModal.close}
				/>
			</Modal>
		</ControlBar>
	);
}
