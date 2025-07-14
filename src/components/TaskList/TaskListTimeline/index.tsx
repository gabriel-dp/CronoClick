import { useEffect, useState } from "react";

import { Id, Subject, SubjectTask } from "@/types/schedules";
import { Configs } from "@/types/configs";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import { useModal } from "@/hooks/useModal";
import { formatDateStringToLocalString } from "@/utils/timeUtils";
import TaskForm from "@/components/forms/TaskForm";
import Modal from "@/components/ui/Modal";

import TaskCard from "./TaskCard";
import { CardList, DayGroup } from "./styles";

interface TaskListTimelineI {
	subjects: Subject[];
	configs: Configs;
	controls: ScheduleControlI;
}

export default function TaskListTimeline(props: TaskListTimelineI) {
	const [selectedTask, setSelectedTask] = useState<SubjectTask | null>(null);
	const editTaskModal = useModal();

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

	const handleTaskClick = (subjectId: Id, taskId: Id) => {
		const task = props.controls.getTask(subjectId, taskId);
		setSelectedTask(task ?? null);
		editTaskModal.open();
	};

	useEffect(() => {
		setSelectedTask((prev) => {
			if (!prev) return prev;
			return props.controls.getTask(prev.subjectId, prev.id) ?? null;
		});
	}, [props.subjects, props.controls]);

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
										task={task}
										subject={subject}
										handleTaskClick={handleTaskClick}
										controls={props.controls}
									/>
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
