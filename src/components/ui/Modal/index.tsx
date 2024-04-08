"use client";

import { useEffect, useRef } from "react";

import Button from "@/components/ui/Button";

import {
	BackgroundFilter,
	CloseButtonContainer,
	ModalContainer
} from "./styles";

interface ModalProps extends React.PropsWithChildren {
	isOpen: boolean;
	close: () => void;
}

export default function Modal(props: ModalProps) {
	function handleModalClick(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation(); // Avoids that clicks go through modal
	}

	// Scrolls modal to top every time that it is open
	const modalRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (modalRef.current && props.isOpen) {
			modalRef.current.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [props.isOpen]);

	return (
		<BackgroundFilter
			onClick={props.close}
			$isOpen={props.isOpen.toString()}
		>
			<ModalContainer onClick={handleModalClick} ref={modalRef}>
				<CloseButtonContainer>
					<Button className="close-button" onClick={props.close}>
						X
					</Button>
				</CloseButtonContainer>
				{props.children}
			</ModalContainer>
		</BackgroundFilter>
	);
}
