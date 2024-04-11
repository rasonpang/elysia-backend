import Elysia from "elysia";
import { readdir } from "node:fs/promises";

async function ControllerLoader(app: any) {
	const targetSrc = "app/controllers";

	// List of Model
	let controllers: any = await readdir(`src/${targetSrc}`);
	controllers = controllers.map(
		async (controllerSrc: string) =>
			await import(`@/${targetSrc}/${controllerSrc}`)
	);

	// Loading Script
	const loadedControllers = await Promise.all(
		controllers.map(async (controller: any) => {
			return await controller;
		})
	);
	for (const controller of loadedControllers) {
		controller.default(app);
	}
}

export default ControllerLoader;
