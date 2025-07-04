import { useState } from "react";

import { Class } from "@/types/classes";
import { Id, Subject } from "@/types/schedules";
import { useModal } from "@/hooks/useModal";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import Modal from "@/components/ui/Modal";
import SubjectForm from "@/components/forms/SubjectForm";

import ClassCard from "./ClassCard";
import { DayContainer, GridContainer, IntervalLine, TimeSpan } from "./styles";

interface GridProps {
	weekClasses: Class[][];
	start: number;
	end: number;
	interval: number;
	controls: ScheduleControlI;
}

export default function Grid(props: GridProps) {
	const [selectedSubject, setSelectedSubject] = useState<Subject | null>(
		null
	);
	const editSubjectModal = useModal();

	const handleClassClick = (id: Id) => {
		const subject = props.controls.getSubject(id);
		setSelectedSubject(subject ?? null);
		editSubjectModal.open();
	};

	const intervals = Math.ceil((props.end - props.start) / props.interval) + 1;

	function percentageRatio(value: number) {
		const ratio = (value - props.start) / (props.end - props.start);
		return ratio * 100;
	}

	return (
		<GridContainer>
			{props.weekClasses.map((dayClasses, day) => (
				<DayContainer key={day}>
					{Array.from({ length: intervals }, (_, i) => (
						<IntervalLine key={`${day}-${i}`} />
					))}
					{dayClasses.reverse().map((dayClass) => (
						<TimeSpan
							key={day + dayClass.start + dayClass.subject.id}
							$startPercentage={percentageRatio(dayClass.start)}
							$endPercentage={percentageRatio(
								dayClass.start + dayClass.duration
							)}
						>
							<ClassCard
								class={dayClass}
								onClick={() =>
									handleClassClick(dayClass.subject.id)
								}
							/>
						</TimeSpan>
					))}
				</DayContainer>
			))}
			<Modal {...editSubjectModal}>
				<SubjectForm
					controls={props.controls}
					finally={() => {
						editSubjectModal.close();
						setSelectedSubject(null);
					}}
					original={selectedSubject ?? undefined}
				/>
			</Modal>
		</GridContainer>
	);
}
