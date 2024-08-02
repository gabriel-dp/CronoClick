import { useState } from "react";

import { Id, Subject, SubjectTask } from "@/types/schedules";
import { ScheduleControlI } from "@/hooks/useSchedule";
import { useModal } from "@/hooks/useModal";
import { formatDateStringToLocalString } from "@/utils/timeUtils";
import Modal from "@/components/ui/Modal";
import TaskForm from "@/components/forms/TaskForm";

import { CardList, DayGroup, TaskCard, TaskCardData } from "./styles";

interface TaskListI {
	subjects: Subject[];
	hideFinished: boolean;
	controls: ScheduleControlI;
}

export default function TaskList(props: TaskListI) {
	const [selectedTask, setSelectedTask] = useState<SubjectTask | null>(null);
	const editTaskModal = useModal();

	const handleTaskClick = (subjectId: Id, taskId: Id) => {
		const subject = props.controls.getTask(subjectId, taskId);
		setSelectedTask(subject ?? null);
		editTaskModal.open();
	};

	// Extract all tasks from all subjects
	const tasks: SubjectTask[] = props.subjects
		.map((subject) =>
			subject.tasks.map((task) => ({ ...task, subjectId: subject.id }))
		)
		.flat()
		.sort(
			(a, b) =>
				new Date(a.submission).getTime() -
				new Date(b.submission).getTime()
		);

	// Group tasks by the submission date
	const tasksDays = tasks.reduce<{ [key: string]: SubjectTask[] }>(
		(acc, cur) => {
			if (!acc[cur.submission]) acc[cur.submission] = [];
			acc[cur.submission].push(cur);
			return acc;
		},
		{}
	);

	return (
		<CardList>
			{Object.entries(tasksDays).map(([date, dateTasks]) => {
				return (
					<DayGroup key={date}>
						<p className="date">
							{formatDateStringToLocalString(date)}
						</p>
						{dateTasks?.map((task) => {
							const subject = props.controls.getSubject(
								task.subjectId
							);
							return (
								<TaskCard
									key={task.id}
									$color={subject?.color ?? "#FFFFFF"}
									onClick={() =>
										handleTaskClick(task.subjectId, task.id)
									}
								>
									<TaskCardData>
										<p className="subject">
											{subject?.name}
										</p>
										<p className="task">{task.name}</p>
									</TaskCardData>
								</TaskCard>
							);
						})}
					</DayGroup>
				);
			})}
			<Modal {...editTaskModal}>
				<TaskForm
					controls={props.controls}
					finally={editTaskModal.close}
					original={selectedTask ?? undefined}
				/>
			</Modal>
		</CardList>
	);
}
