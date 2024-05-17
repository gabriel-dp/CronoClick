"use client";

import { Dispatch, SetStateAction, useState } from "react";

type useLocalStorageReturn<T> = [
	value: T,
	setValue: Dispatch<SetStateAction<T>>
];

// Limit local storage usage ony for browsers
const isServer = typeof window == "undefined";

export function useLocalStorage<T>(
	key: string,
	initialValue: T
): useLocalStorageReturn<T> {
	const writeStoredValue = (value: T) => {
		if (isServer) return;

		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.warn(`Error writing local storage: ${error}`);
		}
	};

	const readStoredValue = () => {
		if (isServer) return undefined;

		try {
			const item = window.localStorage.getItem(key);
			if (!item) {
				writeStoredValue(initialValue);
				return initialValue;
			}

			const parsed = JSON.parse(item);
			return parsed as T;
		} catch (error) {
			console.warn(`Error reading local storage: ${error}`);
			return undefined;
		}
	};

	const [value, setValue] = useState<T>(readStoredValue() ?? initialValue);

	const setStoredValue: Dispatch<SetStateAction<T>> = (
		action: SetStateAction<T>
	) => {
		if (typeof action === "function") {
			const newActionValue = (action as (prevState: T) => T)(value);
			setValue(newActionValue);
			writeStoredValue(newActionValue);
		} else {
			setValue(action);
			writeStoredValue(action);
		}
	};

	return [value, setStoredValue];
}
