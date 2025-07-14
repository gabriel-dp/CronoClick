"use client";

import React, { useState } from "react";

import Modal from "@/components/ui/Modal";
import { MODAL_TRANSITION_TIME_MS } from "@/components/ui/Modal/styles";

interface useModalReturn {
	isOpen: boolean;
	open: () => void;
	close: (fun?: () => void) => void;
}

export function useModal(): useModalReturn {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const open = () => setIsOpen(true);
	const close = (fun?: () => void) => {
		setIsOpen(false);

		if (fun == undefined) return;
		new Promise<void>((resolve) =>
			setTimeout(() => {
				resolve();
				fun();
			}, MODAL_TRANSITION_TIME_MS)
		);
	};

	return { isOpen, open, close };
}

export function useModalComponent(
	element: JSX.Element
): useModalReturn & { component: JSX.Element } {
	const state = useModal();

	const component = (
		<Modal isOpen={state.isOpen} close={state.close}>
			{element}
		</Modal>
	);

	return { ...state, component };
}
