const nodemailer = require("nodemailer");

module.exports = class Email {
	constructor(user, url) {
		this.to = user.email;
		this.url = url;
		this.from = `Administrator <${process.env.EMAIL_FROM}>`;
	}

	newTransport() {
		return nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_PASSWORD
			}
		});
	}

	//Send the actual email
	async send(subject, html) {
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html
		};

		//3) Create a transport and send email
		const tranporter = await this.newTransport();
		await tranporter.sendMail(mailOptions);
	}

	async sendWelcome() {
		await this.send(
			"Welcome To Sangmanch",
			"<p>We are glad to welcome you as a part of our family!</p>"
		);
	}

	async verifyEmail() {
		const html = `Please click this link to verify your email: <a href="${this.url}">${this.url}</a>`;
		await this.send("Verify your Email", html);
	}
};
