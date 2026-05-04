"use client";
// Local useColorMode shim — wraps next-themes so every component can keep
// the familiar { colorMode, toggleColorMode } interface without importing from
// @chakra-ui/react (which no longer ships its own color-mode implementation
// in v3).
import { createContext, useContext } from "react";
import { useTheme, ThemeProvider } from "next-themes";

const ColorModeContext = createContext({ colorMode: "dark", toggleColorMode: () => {} });

export function ColorModeProvider({ children, ...props }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      {...props}
    >
      <InnerProvider>{children}</InnerProvider>
    </ThemeProvider>
  );
}

function InnerProvider({ children }) {
  const { resolvedTheme, setTheme } = useTheme();
  const colorMode = resolvedTheme ?? "dark";
  const toggleColorMode = () => setTheme(colorMode === "dark" ? "light" : "dark");

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  return useContext(ColorModeContext);
}
