import { ElysiaApp } from "@/interfaces/Elysia";

async function ModelLoader(app: ElysiaApp) {
	// List of Model
	const models = [import("@/app/models/user")];

	// Loading Script
	const loadedModels = await Promise.all(
		models.map(async (model: any) => {
			return await model;
		})
	);
	for (const model of loadedModels) {
		model.default(app);
	}
}

export default ModelLoader;
