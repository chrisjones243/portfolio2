import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const secret_key = process.env.RECAPTCHA_SECRET_KEY;

  const { token } = await req.json();

  if (!secret_key) {
    return NextResponse.json(
      { success: false, message: "Missing reCAPTCHA secret key" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
      },
    );
    const data = await response.json();

    if (data.success) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed" },
        { status: 500 },
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, message: "Failed to verify captcha" },
      { status: 500 },
    );
  }
}
