import Elysia from "elysia";

function UserController(elysia: Elysia) {
	elysia.group("/users" as any, (app: Elysia) => {
		return (
			app
				// Sign In
				.post(
					"/sign-in",
					async function ({ body }) {
						const { account, password }: any = body;
						if (account == "123" && password == "456") return true;
						return false;
					},
					{
						body: "user.input.sign-in" as any,
					}
				)

				// Sign Up
				.post(
					"sign-up",
					async function ({ body }) {
						const { account, password }: any = body;
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
