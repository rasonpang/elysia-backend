import { Elysia, t } from "elysia";

const UserModel = new Elysia().model({
	"user.sign-in": t.Object({
		account: t.String(),
		password: t.String(),
	}),
});

export default UserModel;
