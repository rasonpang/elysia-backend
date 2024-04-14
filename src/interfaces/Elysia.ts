import { Cookie } from "elysia";
import { DB } from "./Prisma";
import { JWTPayloadSpec } from "@elysiajs/jwt";

export type ElysiaResponse = {
	body: any;
	query: Record<string, string | undefined>;
	params: never;
	headers: Record<string, string | undefined>;
	db: DB;
	cookie: Record<string, Cookie<any>>;
	set: any;
	jwt: {
		readonly sign: (
			morePayload: Record<string, string | number> & JWTPayloadSpec
		) => Promise<string>;
		readonly verify: (jwt?: string | undefined) => Promise<any>;
	};
	[keyName: string]: any;
};
