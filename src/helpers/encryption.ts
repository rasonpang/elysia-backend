import { CryptoHasher } from "bun";
import { isBefore, fromUnixTime } from "date-fns";

export async function Encrypt(value: string) {
	const hasher = new CryptoHasher("sha256");
	hasher.update(value);
	return hasher.digest("hex");
}

export function VerifyJWT({ jwt, headers, set }: any) {
	try {
		const authPrefix = "Bearer ";
		// Check token existence
		if (
			!(
				headers?.authorization &&
				headers?.authorization.substring(0, authPrefix.length) ==
					authPrefix
			)
		)
			throw new Error("no-token-found");

		const tokenStr = headers?.authorization.substring(authPrefix.length);
		return jwt.verify(tokenStr).then((token: any) => {
			// Check token validity
			if (!token) throw new Error("invalid-token");

			// Check token expiration date
			if (isBefore(fromUnixTime(token.exp), new Date()))
				throw new Error("token-expired");
		});
	} catch (err: any) {
		set.status = 401;
		return { message: err.message };
	}
}

export function GetJWT({ jwt, headers }: any) {
	const authPrefix = "Bearer ";
	const tokenStr = headers?.authorization.substring(authPrefix.length);
	return jwt.verify(tokenStr).then((token: any) => ({ token }));
}
