import React from "react";
import Modal from ".";
import Button from "@/components/ui/Button";

interface ConfirmDeleteModalProps {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	title?: string;
	description?: string;
}

export default function ConfirmDeleteModal({
	isOpen,
	onConfirm,
	onCancel,
	title = "Confirmar deleção",
	description = "Tem certeza que deseja deletar? Esta ação não poderá ser desfeita."
}: ConfirmDeleteModalProps) {
	return (
		<Modal isOpen={isOpen} close={onCancel}>
			<h2>{title}</h2>
			<p style={{ margin: "1rem 0" }}>{description}</p>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					gap: "1rem"
				}}
			>
				<Button onClick={onCancel}>Cancelar</Button>
				<Button
					onClick={onConfirm}
					style={{ background: "#ff4444", color: "#fff" }}
				>
					Deletar
				</Button>
			</div>
		</Modal>
	);
}
