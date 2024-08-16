import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(req: Request) {
  const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
  const password = process.env.BURNER_PASSWORD;
  const myEmail = process.env.PERSONAL_EMAIL;

  const { subject, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    service: "Gmail",
    secure: true,
    auth: {
      user: username,
      pass: password,
    },
  });

  const mailData = {
    from: username,
    to: myEmail,
    subject: `Website activity from ${email}`,
    html: `
      <h3>Email: ${email}</h3>
      <b>Subject: ${subject}</b>
      <p>Message: ${message}</p>
    `,
  };

  await transporter.sendMail(mailData, function (err: any, info: any) {
    if (err) {
      return NextResponse.json(
        { success: false, message: "Failed to send email" },
        { status: 500 }
      );
    }
  });

  return NextResponse.json(
    { success: true, message: "Email sent" },
    { status: 200 }
  );
}
