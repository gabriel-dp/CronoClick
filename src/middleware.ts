import { NextResponse } from "next/server";

import { isAuthorized } from "@/utils/authUtils";

const API_WHITELIST = ["auth"];

export const config = {
	matcher: [`/api/((?!${API_WHITELIST.join("|")}).*)`]
};

export function middleware() {
	const result = isAuthorized();
	if (!result) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	return NextResponse.next();
}
