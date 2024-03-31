import React, { useState } from "react";

import Modal from "@/components/ui/Modal";

interface useModalReturn {
	isOpen: boolean;
	open: () => void;
	close: () => void;
}

export function useModal(): useModalReturn {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);

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
