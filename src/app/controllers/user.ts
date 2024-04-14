import { encrypt } from "@/helpers/encryption";
import { sendEmail } from "@/helpers/email";
import { ElysiaResponse } from "@/interfaces/Elysia";

async function SignIn({ cookie: { auth }, body, db, jwt }: ElysiaResponse) {
	const { username, password } = body;

	// Retrieve the user from the database
	const user = await db.user.findUnique({
		where: {
			username,
			password: await encrypt(password),
		},
	});

	if (!user) throw new Error("user.sign-in.failed");

	return auth.set({
		value: await jwt.sign({ username }),
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
			password: await encrypt(password),
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

	await sendEmail(user.email, {
		subject: "Test",
		data: "<div>kekw</div>",
	});
}

const UserController = {
	SignIn,
	SignUp,
	ForgotPassword,
};

export default UserController;
