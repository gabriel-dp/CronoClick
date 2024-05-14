import { useState, useEffect, useCallback, useRef } from "react";

export function useCloseTabAlert<T>(state?: T) {
	const [shouldAlert, setShouldAlert] = useState<boolean>(false);

	const alert = useCallback(
		(event: BeforeUnloadEvent) => {
			if (shouldAlert) {
				event.preventDefault();
				return "There are unsaved changes";
			}
		},
		[shouldAlert]
	);

	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => alert(event);
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [alert]);

	const enableCloseAlert = () => setShouldAlert(true);
	const disableCloseAlert = () => setShouldAlert(false);

	const isFirstRender = useRef(true);
	useEffect(() => {
		if (isFirstRender.current == false && state != undefined) {
			console.log("mudou");
			enableCloseAlert();
			return;
		}
		isFirstRender.current = false;
	}, [state]);

	return { enableCloseAlert, disableCloseAlert };
}
