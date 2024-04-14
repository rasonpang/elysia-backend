import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import { PrismaClient } from "@prisma/client";

import ModelLoader from "./loaders/ModelLoader";
import { ErrorHandler } from "./helpers/error";
import ApiLoader from "./loaders/ApiLoader";

async function createApp() {
	const db = new PrismaClient();

	const app = new Elysia()
		.use(swagger())
		.use(
			jwt({
				name: "jwt",
				secret: process.env.JWT_SECRETS!,
				exp: "7d",
			})
		)
		.decorate("db", db)
		.onError(ErrorHandler);

	await ModelLoader(app);
	await ApiLoader(app);

	app.onStart(() => console.log("Server is ready to serve")).listen(3000);

	return app;
}

const ElysiaApp = createApp();
