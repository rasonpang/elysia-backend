export function ErrorHandler({ code, error, set }: any) {
	set.status = 400;

	if (error.message) {
		return { message: error.message };
	}

	return { message: "unknown" };
}
