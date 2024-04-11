import Elysia from "elysia";

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
