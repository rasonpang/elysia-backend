import Elysia from "elysia";
import { CryptoHasher } from "bun";

function UserController(elysia: Elysia) {
	elysia.group("/users" as any, (app: Elysia) => {
		return (
			app
				// Sign In
				.post(
					"/sign-in",
					async function ({ set, cookie: { auth }, body, db, jwt }) {
						const { account, password }: any = body;

						// Retrieve the user from the database
						const hasher = new CryptoHasher("sha256");
						hasher.update(password);
						const user = await db.user.findUnique({
							where: {
								username: account,
								password: hasher.digest("hex"),
							},
						});

						if (user) {
							return auth.set({
								value: await jwt.sign({ account }),
								maxAge: 604800, // 7 Days
							});
						}

						set.status = 401;
						return { message: "user.sign-in.failed" };
					},
					{
						body: "user.input.sign-in" as any,
					}
				)

				// Sign Up
				.post(
					"sign-up",
					async function ({ body, set, db, jwt }) {
						const { account, password }: any = body;

						// Check for user existence
						const user = await db.user.findUnique({
							where: {
								username: account,
							},
						});
						if (user) {
							set.status = 401;
							return { message: "user.sign-up.user_exist" };
						}

						// Create user
						const hasher = new CryptoHasher("sha256");
						hasher.update(password);
						await db.user.create({
							data: {
								username: account,
								password: hasher.digest("hex"),
							},
						});

						return { message: "user.sign-up.success" };
					},
					{
						body: "user.input.sign-in" as any,
					}
				)

				// Forgot Password
				.post("forgot-password", async function ({ body }) {}, {
					body: "user.input.sign-in" as any,
				})
		);
	});
}

export default UserController;
