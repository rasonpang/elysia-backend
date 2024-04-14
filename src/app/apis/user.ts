import Elysia from "elysia";
import UserController from "../controllers/user";
import { GetJWT, VerifyJWT } from "@/helpers/encryption";

function UserApi(elysia: Elysia) {
	elysia.group("/users" as any, (app: Elysia) => {
		return (
			app
				// Sign In
				.post("/sign-in", UserController.SignIn, {
					body: "user.input.sign-in" as any,
				})

				// Sign Up
				.post("sign-up", UserController.SignUp, {
					body: "user.input.sign-up" as any,
				})

				// Forgot Password
				.post("forgot-password", UserController.ForgotPassword, {
					body: "user.input.forgot-password" as any,
				})

				// Guarded Routes
				.guard({ beforeHandle: VerifyJWT }, (app) =>
					app
						.resolve(GetJWT)
						.get("/profile", UserController.Profile.Get)
						.put("/profile", UserController.Profile.Update, {
							body: "user.profile.input.update" as any,
						})
				)
		);
	});
}

export default UserApi;
