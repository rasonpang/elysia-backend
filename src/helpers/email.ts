const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.mailgun.org",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL_ADDRESS!,
		pass: process.env.EMAIL_ADDRESS_PASSWORD!,
	},
});

interface EmailPayload {
	subject: string;
	data: string;
}

export async function SendEmail(toEmail: string, payload: EmailPayload) {
	let mailOptions = {
		to: process.env.EMAIL_ADDRESS,
		from: `Anonymous`,
		subject: payload.subject,
		text: payload.data,
	};

	await transporter.sendMail(mailOptions, (error: any, info: any) => {
		if (error) return console.log(error);
		console.log("Message sent");
	});
}
