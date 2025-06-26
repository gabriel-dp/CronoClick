import {
	FaNotesMedical as AddNoteIcon,
	FaRegTrashCan as RemoveNoteIcon,
	FaRegFloppyDisk as EditNoteIcon
} from "react-icons/fa6";

import { Id, Subject, SubjectTask } from "@/types/schedules";
import { ScheduleControlI } from "@/utils/scheduleUtils";
import Checkbox from "@/components/ui/Checkbox";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import React from "react";
import ConfirmDeleteModal from "@/components/ui/Modal/ConfirmDeleteModal";

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
	const [deleteModalOpen, setDeleteModalOpen] = React.useState<null | string>(
		null
	);

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
		setDeleteModalOpen(id);
	}

	function confirmDeleteNote() {
		if (!subject || !deleteModalOpen) return;
		controls.removeNote({
			id: deleteModalOpen,
			taskId: task.id,
			subjectId: subject?.id,
			description: ""
		});
		setDeleteModalOpen(null);
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
			<ConfirmDeleteModal
				isOpen={!!deleteModalOpen}
				onCancel={() => setDeleteModalOpen(null)}
				onConfirm={confirmDeleteNote}
				title="Deletar anexo?"
				description={
					<>
						Tem certeza que deseja deletar este anexo?
						<br />
						Esta ação não poderá ser desfeita.
					</>
				}
			/>
		</CardContainer>
	);
}
