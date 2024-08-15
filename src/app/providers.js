"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function Providers({ children }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    >
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </GoogleReCaptchaProvider>
  );
}
