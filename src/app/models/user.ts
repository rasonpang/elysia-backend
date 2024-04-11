import { Elysia, t } from "elysia";

function UserModel(app: Elysia) {
	return app.model({
		"user.input.sign-in": t.Object({
			account: t.String(),
			password: t.String(),
		}),
	});
}

export default UserModel;
