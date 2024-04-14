import Elysia from "elysia";
import UserController from "../controllers/user";

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
		);
	});
}

export default UserApi;
