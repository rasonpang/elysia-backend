import { readdir } from "node:fs/promises";

async function ApiLoader(app: any) {
	const targetSrc = "app/apis";

	// Retrieve List
	let apis: any = await readdir(`src/${targetSrc}`);
	apis = apis.map(
		async (apiSrc: string) => await import(`@/${targetSrc}/${apiSrc}`)
	);

	// Loading Script
	const loadedApis = await Promise.all(
		apis.map(async (api: any) => {
			return await api;
		})
	);
	for (const api of loadedApis) {
		api.default(app);
	}
}

export default ApiLoader;
