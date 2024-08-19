import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(req: Request) {
  const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
  const password = process.env.BURNER_PASSWORD;
  const myEmail = process.env.PERSONAL_EMAIL;

  if (!username || !password || !myEmail) {
    console.error("Missing environment variables");
    return NextResponse.json(
      { error: "Missing environment variables" },
      { status: 500 }
    );
  }

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

  try {
    const info = await transporter.sendMail(mailData);
    console.log("Email sent: ", info.response);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email: ", err);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
