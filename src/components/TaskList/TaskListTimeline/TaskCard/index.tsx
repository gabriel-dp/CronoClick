import {
	FaNotesMedical as AddNoteIcon,
	FaRegTrashCan as RemoveNoteIcon
} from "react-icons/fa6";

import { Id, Subject, SubjectTask } from "@/types/schedules";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import Checkbox from "@/components/ui/Checkbox";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

import {
	AddNoteButton,
	CardContainer,
	CardData,
	NoteCard,
	NotesContainer
} from "./styles";

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
	function handleNewNoteClick() {
		if (!subject) return;

		controls.addNote({
			id: "",
			description: "",
			taskId: task.id,
			subjectId: subject?.id
		});
	}

	function handleRemoveNoteClick(id: Id) {
		if (!subject) return;

		controls.removeNote({
			id,
			taskId: task.id,
			subjectId: subject?.id,
			description: ""
		});
	}

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
			<NotesContainer onClick={(event) => event.stopPropagation()}>
				{task.notes.map((note) => (
					<NoteCard key={note.id}>
						<Textarea name={note.id} label="" />
						<Button
							stopPropagation
							onClick={() => handleRemoveNoteClick(note.id)}
						>
							<RemoveNoteIcon />
						</Button>
					</NoteCard>
				))}
			</NotesContainer>
			<AddNoteButton stopPropagation onClick={handleNewNoteClick}>
				<AddNoteIcon />
			</AddNoteButton>
		</CardContainer>
	);
}
