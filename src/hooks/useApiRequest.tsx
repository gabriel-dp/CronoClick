"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export enum FetchStatus {
	Idle = "idle",
	Loading = "loading",
	Success = "success",
	Error = "error"
}

export type RequestType = "GET" | "POST" | "PUT" | "DELETE";

interface useApiOptions<Data> {
	method: RequestType;
	body: Partial<Data>;
	immediate?: boolean;
}

interface useApiReturn<Data> {
	data: Data | null;
	error: string | null;
	status: FetchStatus;
	execute: () => void;
}

export async function apiRequest<Body extends object = object, T = object>(
	path: string,
	method: RequestType,
	body: Partial<Body>,
	callbacks: {
		actionSuccess?: () => void;
		actionError?: (message: string) => void;
		actionResponse?: (data: T) => void;
	}
) {
	const response = await fetch(`/api/${path}`, {
		method: method,
		body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
		}
	});

	if (response.ok) {
		if (callbacks.actionSuccess) {
			callbacks.actionSuccess();
		}
		response.json().then((data: T) => {
			if (callbacks.actionResponse) callbacks.actionResponse(data);
		});
	} else {
		if (callbacks.actionError) {
			callbacks.actionError(response.statusText);
		}
	}

	return response;
}

export function useApiRequest<Data, Body extends object = object>(
	path: string,
	{ method, body, immediate }: useApiOptions<Body>
): useApiReturn<Data> {
	const [data, setData] = useState<Data | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [status, setStatus] = useState<FetchStatus>(FetchStatus.Idle);

	// Prevent infinite loops on body object
	const bodyRef = useRef(body);

	const execute = useCallback(() => {
		setData(null);
		setError(null);
		setStatus(FetchStatus.Loading);

		apiRequest(path, method, bodyRef.current, {
			actionResponse: (data: Data) => {
				setData(data);
				setStatus(FetchStatus.Success);
			},
			actionError: (message: string) => {
				setError(message);
				setStatus(FetchStatus.Error);
			}
		});
	}, [path, method, bodyRef]);

	useEffect(() => {
		if (immediate == undefined || immediate) {
			execute();
		}
	}, [execute, immediate]);

	return {
		data,
		error,
		status,
		execute
	};
}
