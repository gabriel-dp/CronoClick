import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Subject } from "@/types/schedules";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import Modal from "@/components/ui/Modal";
import SubjectForm from "@/components/forms/SubjectForm";
import { ListContainer, SubjectItem, ColorBox } from "./styles";

interface SubjectListProps {
	subjects: Subject[];
	controls: ScheduleControlI;
}

export default function SubjectList({ subjects, controls }: SubjectListProps) {
	const editSubjectModal = useModal();
	const [selectedSubject, setSelectedSubject] = useState<Subject | null>(
		null
	);

	const handleSubjectClick = (subject: Subject) => {
		setSelectedSubject(subject);
		editSubjectModal.open();
	};

	return (
		<ListContainer>
			{subjects.map((subject) => (
				<SubjectItem
					key={subject.id}
					onClick={() => handleSubjectClick(subject)}
				>
					<ColorBox style={{ backgroundColor: subject.color }} />
					<span>{subject.name}</span>
				</SubjectItem>
			))}
			<Modal {...editSubjectModal}>
				{selectedSubject && (
					<SubjectForm
						controls={controls}
						finally={editSubjectModal.close}
						original={selectedSubject}
					/>
				)}
			</Modal>
		</ListContainer>
	);
}
