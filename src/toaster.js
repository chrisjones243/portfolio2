"use client";
import { createToaster, Toaster as ChakraToaster } from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "top-end",
  pauseOnPageIdle: true,
});

export function Toaster() {
  return <ChakraToaster toaster={toaster} insetInline={{ mdDown: "auto" }} />;
}
