import { compare, hash } from "bcrypt";
import { User } from "@prisma/client";
import z from "zod";

const userValidation = z.object({
	username: z.string().min(1, "Username is required").max(100),
	email: z.string().min(1, "Email is required").email("Invalid email"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must have at least 8 characters ")
});

export const validatedFields = (
	body: User
): Pick<User, "username" | "email" | "password"> => {
	const fields = userValidation.parse(body);
	return fields;
};

export const removePassword = (
	user: User | null
): Omit<User, "password"> | null => {
	if (!user) return null;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password: _, ...userWithoutPassword } = user;
	return userWithoutPassword;
};

export const encrypt = async (value: string): Promise<string> => {
	const encryptedValue = await hash(value, 10);
	return encryptedValue;
};

export const compareEncrypted = async (
	value: string,
	encrypted: string
): Promise<boolean> => {
	const match = await compare(value, encrypted);
	return match;
};
