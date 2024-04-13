import Elysia from "elysia";
import { encrypt } from "@/helpers/encryption";
import { sendEmail } from "@/helpers/email";

function UserController(elysia: Elysia) {
	elysia.group("/users" as any, (app: Elysia) => {
		return (
			app
				// Sign In
				.post(
					"/sign-in",
					async function ({ set, cookie: { auth }, body, db, jwt }) {
						const { username, password }: any = body;

						// Retrieve the user from the database
						const user = await db.user.findUnique({
							where: {
								username: username,
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
					async function ({ body, set, db, jwt }) {
						const { username, password, email }: any = body;

						// Check for user existence
						const user = await db.user.findUnique({
							where: {
								username: username,
							},
						});

						if (user) throw new Error("user.sign-up.user_exist");

						// Create user
						await db.user.create({
							data: {
								username: username,
								password: await encrypt(password),
								email: email,
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
						const { username }: any = body;

						// Retrieve the user from the database
						const user = await db.user.findUnique({
							where: {
								username: username,
							},
							select: {
								email: true,
							},
						});

						if (!user)
							throw new Error(
								"user.forgot-password.invalid-username"
							);

						await sendEmail(user.email, {
							subject: "Test",
							data: "<div>kekw</div>",
						});

						console.log("test ->");
					},
					{
						body: "user.input.forgot-password" as any,
					}
				)
		);
	});
}

export default UserController;
