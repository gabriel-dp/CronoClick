"use client";

import { useCallback, useState } from "react";

type useLocalStorageReturn<T> = [value: T, setValue: (newValue: T) => void];

// Limit local storage usage ony for browsers
const isServer = typeof window == "undefined";

export function useLocalStorage<T>(
	key: string,
	initialValue: T
): useLocalStorageReturn<T> {
	const writeStoredValue = useCallback(
		(value: T) => {
			if (isServer) return;

			try {
				window.localStorage.setItem(key, JSON.stringify(value));
			} catch (error) {
				console.warn(`Error writing local storage: ${error}`);
			}
		},
		[key]
	);

	const readStoredValue = useCallback(() => {
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
	}, [key, initialValue, writeStoredValue]);

	const [value, setValue] = useState<T>(readStoredValue() ?? initialValue);

	const setStoredValue = useCallback(
		(newValue: T) => {
			writeStoredValue(newValue);
			setValue(newValue);
		},
		[writeStoredValue]
	);

	return [value, setStoredValue];
}
