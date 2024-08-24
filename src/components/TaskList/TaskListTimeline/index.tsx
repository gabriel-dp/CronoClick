import { useState } from "react";

import { Id, Subject, SubjectTask } from "@/types/schedules";
import { Configs } from "@/types/configs";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import { useModal } from "@/hooks/useModal";
import { formatDateStringToLocalString } from "@/utils/timeUtils";
import TaskForm from "@/components/forms/TaskForm";
import Modal from "@/components/ui/Modal";
import Checkbox from "@/components/ui/Checkbox";

import { CardList, DayGroup, TaskCard, TaskCardData } from "./styles";

interface TaskListTimelineI {
	subjects: Subject[];
	configs: Configs;
	controls: ScheduleControlI;
}

export default function TaskListTimeline(props: TaskListTimelineI) {
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
			if (!props.configs.hideFinishedTasks && cur.finished) return acc;

			if (!acc[cur.submission]) acc[cur.submission] = [];
			acc[cur.submission].push(cur);
			return acc;
		},
		{}
	);

	return (
		<CardList>
			{Object.keys(tasksDays).length > 0 ? (
				Object.entries(tasksDays).map(([date, dateTasks]) => {
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
										$finished={
											task.finished?.toString() ?? "false"
										}
										onClick={() =>
											handleTaskClick(
												task.subjectId,
												task.id
											)
										}
									>
										<TaskCardData>
											<div>
												<p className="subject">
													{subject?.name}
												</p>
												<p className="task">
													{task.name}
												</p>
											</div>
											<div
												onClick={(event) =>
													event.stopPropagation()
												}
											>
												<Checkbox
													label=""
													checked={task.finished}
													onChange={(event) => {
														event.stopPropagation();
														props.controls.toggleFinished(
															task.subjectId,
															task.id
														);
													}}
												/>
											</div>
										</TaskCardData>
									</TaskCard>
								);
							})}
						</DayGroup>
					);
				})
			) : (
				<p className="empty">Não há tarefas agendadas.</p>
			)}
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
