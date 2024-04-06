// Private

import UserType from "@/types/user";

// Public
async function Hi() {
	return "Hello";
}
async function SignIn({ body }) {
	const { account, password } = body;
	if (account == "123" && password == "456") return true;
	return false;
}
async function SignUp() {}
async function ForgotPassword() {}

const UserController = {
	Hi,
	SignIn,
	SignUp,
	ForgotPassword,
};

export default UserController;
