import Elysia from "elysia";
import { readdir } from "node:fs/promises";

async function ModelLoader(app: any) {
	const targetSrc = "app/models";

	// List of Model
	let models: any = await readdir(`src/${targetSrc}`);
	models = models.map(
		async (modelSrc: string) => await import(`@/${targetSrc}/${modelSrc}`)
	);

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
