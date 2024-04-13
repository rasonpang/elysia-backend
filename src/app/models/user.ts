import { Elysia, t } from "elysia";

function UserModel(app: Elysia) {
	return app.model({
		"user.input.forgot-password": t.Object({
			username: t.String(),
		}),
		"user.input.sign-in": t.Object({
			username: t.String(),
			password: t.String(),
		}),
		"user.input.sign-up": t.Object({
			username: t.String(),
			password: t.String(),
			email: t.String(),
		}),
	});
}

export default UserModel;
