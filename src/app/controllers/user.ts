import { Encrypt } from "@/helpers/encryption";
import { SendEmail } from "@/helpers/email";
import { ElysiaResponse } from "@/interfaces/Elysia";
import { fromUnixTime } from "date-fns";
import { ExcludeByKeys } from "@/helpers/data";

async function SignIn({ cookie: { auth }, body, db, jwt }: ElysiaResponse) {
	const { username, password } = body;

	// Retrieve the user from the database
	const user = await db.user.findUnique({
		where: {
			username,
			password: await Encrypt(password),
		},
	});

	if (!user) throw new Error("user.sign-in.failed");

	return auth.set({
		value: await jwt.sign({ id: user.id }),
		maxAge: 604800, // 7 Days
	});
}

async function SignUp({ body, db }: ElysiaResponse) {
	const { username, password, email } = body;

	// Check for user existence
	const user = await db.user.findUnique({
		where: { username },
	});

	if (user) throw new Error("user.sign-up.user_exist");

	// Create user
	await db.user.create({
		data: {
			email,
			username,
			password: await Encrypt(password),
		},
	});

	return { message: "user.sign-up.success" };
}

async function ForgotPassword({ body, db }: ElysiaResponse) {
	const { email } = body;

	// Retrieve the user from the database
	const user = await db.user.findUnique({
		where: { email },
	});

	if (!user) throw new Error("user.forgot-password.invalid-username");

	await SendEmail(user.email, {
		subject: "Test",
		data: "<div>kekw</div>",
	});
}

async function UpdateProfile({ body, token, db }: ElysiaResponse) {
	const { dob, ...restData } = body;
	const payload = {
		dob: fromUnixTime(dob),
		...restData,
	};

	await db.userProfile.upsert({
		where: { userId: token.id },
		create: {
			userId: token.id,
			...payload,
		},
		update: payload,
	});

	return { message: "user.profile.update.success" };
}

async function GetProfile({ token, db }: ElysiaResponse) {
	const profile = await db.userProfile.findUnique({
		where: { userId: token.id },
	});

	if (!profile) throw new Error("user.profile.not_exist");

	const excludeList: string[] = ["id", "userId"];
	return { data: ExcludeByKeys(profile, excludeList) };
}

const UserController = {
	SignIn,
	SignUp,
	ForgotPassword,
	Profile: {
		Update: UpdateProfile,
		Get: GetProfile,
	},
};

export default UserController;
