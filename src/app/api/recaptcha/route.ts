import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const secret_key = process.env.RECAPTCHA_SECRET_KEY;
  const site_key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const { token } = await req.json();
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
      }
    );
    if (response.data.success) {
      return NextResponse.json(response.data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed" },
        { status: 500 }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { success: false, message: "Failed to verify captcha" },
      { status: 500 }
    );
  }

  // if (res && res.data?.success && res.data?.score > 0.5) {
  //   console.log("Captcha verified", res.data.score);
  //   return NextResponse.json({
  //     success: true,
  //     message: "Captcha verified",
  //     score: res.data.score,
  //   });
  // } else {
  //   return NextResponse.json(
  //     { success: false, message: "Failed to verify captcha" },
  //     { status: 500 }
  //   );
  // }
}
