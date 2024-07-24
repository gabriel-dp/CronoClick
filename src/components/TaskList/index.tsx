import { Id, Subject, Task } from "@/types/schedules";
import { ScheduleControlI } from "@/hooks/useSchedule";

type SubjectTask = Task & { subjectId: Id };

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
	const tasksDays = Object.groupBy(tasks, ({ submission }) => {
		const date = new Date(submission);
		date.setHours(0, 0, 0, 0);
		return date.toISOString();
	});

	return (
		<>
			{Object.entries(tasksDays).map(([date, dateTasks]) => {
				const a = new Date(date);
				return (
					<div key={date}>
						<p>{a.toLocaleDateString()}</p>
						{dateTasks?.map((task) => {
							const subject = props.controls.getSubject(
								task.subjectId
							);
							return (
								<p key={task.id}>
									{subject?.name} - {task.name}
								</p>
							);
						})}
					</div>
				);
			})}
		</>
	);
}
