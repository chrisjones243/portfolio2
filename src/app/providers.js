"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme";
import { ColorModeProvider } from "./color-mode";
import { Toaster } from "../toaster";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CustomCursor from "./components/customCursor";

import "./global.css";

export function Providers({ children }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      className="recaptcha"
    >
      <ChakraProvider value={system}>
        <ColorModeProvider>
          {children}
          <Toaster />
          <CustomCursor />
          <Analytics />
          <SpeedInsights />
        </ColorModeProvider>
      </ChakraProvider>
    </GoogleReCaptchaProvider>
  );
}
