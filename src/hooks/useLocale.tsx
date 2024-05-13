import { useEffect, useState } from "react";

export function useLocale(): string {
	const [locale, setLocale] = useState<string>("");

	useEffect(() => {
		setLocale(() => {
			if (navigator.languages != undefined) return navigator.languages[0];
			return navigator.language;
		});
	}, []);

	return locale;
}
