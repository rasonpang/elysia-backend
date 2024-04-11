import { ElysiaApp } from "@/interfaces/Elysia";

async function ControllerLoader(app: ElysiaApp) {
	// List of Model
	const controllers = [import("@/app/controllers/user")];

	// Loading Script
	const loadedControllers = await Promise.all(
		controllers.map(async (model: any) => {
			return await model;
		})
	);
	for (const model of loadedControllers) {
		model.default(app);
	}
}

export default ControllerLoader;
