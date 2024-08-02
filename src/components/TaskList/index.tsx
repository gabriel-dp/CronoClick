import { Subject, SubjectTask } from "@/types/schedules";
import { ScheduleControlI } from "@/hooks/useSchedule";
import { CardList, DayGroup, TaskCard, TaskCardData } from "./styles";

interface TaskListI {
	subjects: Subject[];
	hideFinished: boolean;
	controls: ScheduleControlI;
}

export default function TaskList(props: TaskListI) {
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
			const date = new Date(cur.submission);
			date.setHours(0, 0, 0, 0);

			const dateString = date.toISOString();
			if (!acc[dateString]) acc[dateString] = [];
			acc[dateString].push(cur);

			return acc;
		},
		{}
	);

	return (
		<CardList>
			{Object.entries(tasksDays).map(([date, dateTasks]) => {
				const day = new Date(date);
				return (
					<DayGroup key={date}>
						<p className="date">{day.toLocaleDateString()}</p>
						{dateTasks?.map((task) => {
							const subject = props.controls.getSubject(
								task.subjectId
							);
							return (
								<TaskCard
									key={task.id}
									$color={subject?.color ?? "#FFFFFF"}
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
		</CardList>
	);
}
