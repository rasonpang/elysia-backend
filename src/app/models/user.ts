import { Gender } from "@prisma/client";
import { Elysia, t } from "elysia";

function UserModel(app: Elysia) {
	return app.model({
		"user.input.forgot-password": t.Object({
			email: t.String(),
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
		"user.profile.input.update": t.Object({
			bio: t.Optional(t.String()),
			firstName: t.Optional(t.String()),
			lastName: t.String(),
			gender: t.Enum(Gender),
			phoneNumber: t.Optional(t.String()),
			dob: t.Number(),
		}),
	});
}

export default UserModel;
