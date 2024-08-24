import { Schedule } from "@/types/schedules";

import { Configs } from "@/types/configs";
import { ScheduleControlI } from "@/utils/scheduleUtils";

import TaskListControl from "./TaskListControl";
import TaskListTimeline from "./TaskListTimeline";

interface TaskListProps {
	schedule: Schedule;
	controls: ScheduleControlI;
	configs: Configs;
	setConfigs: React.Dispatch<React.SetStateAction<Configs>>;
}

export default function TaskList(props: TaskListProps) {
	return (
		<>
			<TaskListControl
				controls={props.controls}
				configs={props.configs}
				setConfigs={props.setConfigs}
			/>
			<TaskListTimeline
				subjects={props.schedule.subjects}
				controls={props.controls}
				configs={props.configs}
			/>
		</>
	);
}
