"use client";

import Button from "@/components/ui/Button";

interface ConfirmDeleteFormProps {
	onConfirm: () => void;
	onCancel: () => void;
	title?: string;
	description?: React.ReactNode;
}

export default function ConfirmDeleteForm({
	onConfirm,
	onCancel,
	title = "Confirmar deleção",
	description = "Tem certeza que deseja deletar? Esta ação não poderá ser desfeita."
}: ConfirmDeleteFormProps) {
	return (
		<div>
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
		</div>
	);
}
