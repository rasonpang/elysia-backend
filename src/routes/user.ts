import { Elysia, t } from "elysia";
import UserController from "@/controllers/user";

const users = new Elysia({ prefix: "/users" })
	.get("/hi", UserController.Hi)
	.post("/sign-in", UserController.SignIn, { body: "user.sign-in" })
	.post("/sign-up", UserController.SignUp)
	.post("/forgot-password", UserController.ForgotPassword);
export default users;
