import { extendTheme, defineStyleConfig } from "@chakra-ui/react";

import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  font: {
    dark: "#FFFFFF",
    light: "#000000",
  },
  brand: {
    dark: "#FFFFFF",
    light: "#000000",
  },
  background: {
    dark: "#000000",
    light: "#FFFFFF",
  },
  stroke: "#585858",
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode("background.light", "background.dark")(props),
    },
  }),
};

export const theme = extendTheme({
  config,
  colors,
  styles,
});
