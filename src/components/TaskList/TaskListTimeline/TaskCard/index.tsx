import { Id, Subject, SubjectTask } from "@/types/schedules";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import Checkbox from "@/components/ui/Checkbox";

import { CardContainer, CardData } from "./styles";

export interface TaskCardI {
	task: SubjectTask;
	subject: Subject | undefined;
	handleTaskClick: (subjectId: Id, taskId: Id) => void;
	controls: ScheduleControlI;
}

export default function TaskCard({
	task,
	subject,
	handleTaskClick,
	controls
}: TaskCardI) {
	return (
		<CardContainer
			key={task.id}
			$color={subject?.color ?? "#FFFFFF"}
			$finished={task.finished?.toString() ?? "false"}
			onClick={() => handleTaskClick(task.subjectId, task.id)}
		>
			<CardData>
				<div>
					<p className="subject">{subject?.name}</p>
					<p className="task">{task.name}</p>
				</div>
				<div onClick={(event) => event.stopPropagation()}>
					<Checkbox
						label=""
						checked={task.finished}
						onChange={(event) => {
							event.stopPropagation();
							controls.toggleFinished(task.subjectId, task.id);
						}}
					/>
				</div>
			</CardData>
		</CardContainer>
	);
}
