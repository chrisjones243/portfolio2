import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    body: {
      color: "fg",
    },
  },
  theme: {
    tokens: {
      colors: {
        // Single-value token — same in light and dark
        stroke: { value: "#585858" },
      },
    },
    semanticTokens: {
      colors: {
        // Page background
        bg: { value: { _light: "#DEDDCD", _dark: "#111111" } },
        // Inverted background (used for the contrasting column / panel)
        bgInverse: { value: { _light: "#111111", _dark: "#DEDDCD" } },
        // Foreground / text / icon colour
        fg: { value: { _light: "#111111", _dark: "#DEDDCD" } },
        // Inverted foreground
        fgInverse: { value: { _light: "#DEDDCD", _dark: "#111111" } },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

