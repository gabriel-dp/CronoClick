import { headers } from "next/headers";

export function timeSafeEqual(a: string, b: string): boolean {
	const bufA = Buffer.from(a);
	const bufB = Buffer.from(b);

	if (bufA.length !== bufB.length) {
		return false;
	}

	let result = 0;
	for (let i = 0; i < bufA.length; i++) {
		result |= bufA[i] ^ bufB[i];
	}

	return result == 0;
}

function extractBearerToken(): string | null {
	const authorizationHeader = headers().get("authorization");
	if (!authorizationHeader) return null;

	const match = authorizationHeader.match(/^Bearer (.+)$/);
	return match ? match[1] : null;
}

export function isAuthorized(): boolean {
	const key = process.env.API_KEY ?? null;
	const bearerToken = extractBearerToken();
	if (!key || !bearerToken) return false;

	const result = timeSafeEqual(key, bearerToken);
	return result;
}
