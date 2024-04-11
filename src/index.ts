import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

import ModelLoader from "./loaders/ModelLoader";
import ControllerLoader from "./loaders/ControllerLoader";

async function createApp() {
	const app = new Elysia().use(swagger());

	await ModelLoader(app);
	await ControllerLoader(app);

	app.onStart(() => console.log("Server is ready to serve"))
		.onError(({ code }) => {
			if ((code = "NOT_FOUND")) return "Route not found";
			return "Empty";
		})
		.listen(3000);

	return app;
}

const ElysiaApp = createApp();
