import Elysia from "elysia";
import { DB } from "./Prisma";

export type ElysiaApp = Elysia<
	"",
	false,
	{
		decorator: {};
		store: {};
		derive: {};
		resolve: {};
	},
	{
		type: {};
		error: {};
	},
	{
		schema: {};
		macro: {};
	},
	{},
	{
		derive: {};
		resolve: {};
		schema: {};
		decorator: {};
		store: {};
	},
	{
		derive: {};
		resolve: {};
		schema: {};
		macro: {};
	}
>;

export type ElysiaResponse = {
	body: any;
	db: DB;
	[key: string]: any;
};
