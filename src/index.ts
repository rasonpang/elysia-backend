import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

import users from "./routes/user";
import UserModel from "./models/user";

new Elysia()
	.use(swagger())
	.use(UserModel)
	.use(users)

	.onStart(() => {
		console.log("Server is ready to serve");
	})
	.onError(({ code }) => {
		if (code === "NOT_FOUND") return "Route not found";

		return "Empty";
	})
	.listen(3000);
