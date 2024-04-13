import { CryptoHasher } from "bun";

export async function encrypt(value: string) {
	const hasher = new CryptoHasher("sha256");
	hasher.update(value);
	return hasher.digest("hex");
}
