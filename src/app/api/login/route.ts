import prisma from "@/lib/prisma";
import { compareEncrypted } from "@/utils/userUtils";
import { fail, response, success } from "@/utils/response";

export const POST = async (request: Request) =>
	response(async () => {
		const user: { username: string; password: string } =
			await request.json();

		const found = await prisma.user.findUnique({
			where: { username: user.username },
			omit: { password: false }
		});
		if (!found) {
			return fail(401, { details: "User not found" });
		}

		const passwordMatch = await compareEncrypted(
			user.password,
			found.password
		);
		if (!passwordMatch) {
			return fail(401, { details: "Credentials does not match" });
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...userWithoutPassword } = found;
		return success(userWithoutPassword, 200);
	});
