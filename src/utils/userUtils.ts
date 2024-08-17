import { compare, hash } from "bcrypt";

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
