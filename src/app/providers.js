"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./global.css";

export function Providers({ children }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      className="recaptcha"
    >
      <ChakraProvider theme={theme}>
        {children} <Analytics /> <SpeedInsights />
      </ChakraProvider>
    </GoogleReCaptchaProvider>
  );
}
