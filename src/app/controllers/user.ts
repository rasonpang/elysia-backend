import Elysia from "elysia";
import { encrypt } from "@/helpers/encryption";
import { sendEmail } from "@/helpers/email";
import { DB } from "@/interfaces/Prisma";

function UserController(elysia: Elysia) {
	elysia.group("/users" as any, (app: Elysia) => {
		return (
			app
				// Sign In
				.post(
					"/sign-in",
					async function ({ cookie: { auth }, body, db, jwt }) {
						const { username, password }: any = body;

						// Retrieve the user from the database
						const user = await (db as DB).user.findUnique({
							where: {
								username,
								password: await encrypt(password),
							},
						});

						if (!user) throw new Error("user.sign-in.failed");

						return auth.set({
							value: await jwt.sign({ username }),
							maxAge: 604800, // 7 Days
						});
					},
					{
						body: "user.input.sign-in" as any,
					}
				)

				// Sign Up
				.post(
					"sign-up",
					async function ({ body, db }) {
						const { username, password, email }: any = body;

						// Check for user existence
						const user = await (db as DB).user.findUnique({
							where: { username },
						});

						if (user) throw new Error("user.sign-up.user_exist");

						// Create user
						await (db as DB).user.create({
							data: {
								email,
								username,
								password: await encrypt(password),
							},
						});

						return { message: "user.sign-up.success" };
					},
					{
						body: "user.input.sign-up" as any,
					}
				)

				// Forgot Password
				.post(
					"forgot-password",
					async function ({ body, db }) {
						const { email }: any = body;

						// Retrieve the user from the database
						const user = await (db as DB).user.findUnique({
							where: { email },
						});

						if (!user)
							throw new Error(
								"user.forgot-password.invalid-username"
							);

						await sendEmail(user.email, {
							subject: "Test",
							data: "<div>kekw</div>",
						});
					},
					{
						body: "user.input.forgot-password" as any,
					}
				)
		);
	});
}

export default UserController;
