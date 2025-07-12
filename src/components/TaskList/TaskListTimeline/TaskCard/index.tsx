import {
	FaNotesMedical as AddNoteIcon,
	FaRegTrashCan as RemoveNoteIcon,
	FaRegFloppyDisk as EditNoteIcon,
	FaPaperclip as ClipIcon
} from "react-icons/fa6";
import { toast } from "react-hot-toast";

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
		toast.success("Anotação adicionada com sucesso!");
	}

	function handleRemoveNoteClick(id: Id) {
		if (!subject) return;
		controls.removeNote({
			id: id,
			taskId: task.id,
			subjectId: subject?.id,
			description: ""
		});
		toast.success("Anotação removida com sucesso!");
	}

	function handleEditNoteClick(id: Id) {
		if (!subject) return;

		const description = document.getElementsByName(
			`description-${id}`
		)[0] as HTMLTextAreaElement;
		const text = description.value;

		controls.editNote({
			id,
			taskId: task.id,
			subjectId: subject?.id,
			description: text
		});
		toast.success("Anotação atualizada com sucesso!");
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
				<div
					style={{
						display: "flex",
						alignItems: "center",
						flexDirection: "row",
						gap: 0
					}}
					onClick={(event) => event.stopPropagation()}
				>
					<button
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							padding: 0,
							marginRight: 8,
							color: "inherit",
							display: "flex",
							alignItems: "center"
						}}
						title="Ver anexos"
					>
						<ClipIcon
							style={{ fontSize: "1rem", color: "inherit" }}
						/>
					</button>
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
						<Textarea
							name={`description-${note.id}`}
							label=""
							defaultValue={note.description}
						/>
						<Button
							stopPropagation
							onClick={() => handleEditNoteClick(note.id)}
						>
							<EditNoteIcon />
						</Button>
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
