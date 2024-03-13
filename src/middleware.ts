import { NextResponse } from "next/server";

import { isAuthorized } from "@/utils/authUtils";

export const config = {
	matcher: "/api/((?!auth).*)" // matches all '/api/...' routes except '/api/auth/...'
};

export function middleware() {
	const result = isAuthorized();
	if (!result) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	return NextResponse.next();
}
