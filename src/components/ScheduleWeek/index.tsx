import { useRef } from "react";

import { Schedule } from "@/types/schedules";
import { Configs } from "@/types/configs";
import { ScheduleControlI } from "@/utils/scheduleUtils";

import ScheduleGrid from "./ScheduleGrid";
import ScheduleControl from "./ScheduleControl";

interface ScheduleWeekProps {
	schedule: Schedule;
	controls: ScheduleControlI;
	configs: Configs;
	setConfigs: React.Dispatch<React.SetStateAction<Configs>>;
}

export default function ScheduleWeek(props: ScheduleWeekProps) {
	const gridRef = useRef<HTMLDivElement | null>(null);

	return (
		<>
			<ScheduleControl
				schedule={props.schedule}
				controls={props.controls}
				configs={props.configs}
				setConfigs={props.setConfigs}
				gridRef={gridRef}
			/>
			<ScheduleGrid
				subjects={props.schedule.subjects}
				controls={props.controls}
				configs={props.configs}
				$ref={gridRef}
			/>
		</>
	);
}
