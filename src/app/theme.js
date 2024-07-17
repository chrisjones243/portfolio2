import { extendTheme, defineStyleConfig } from "@chakra-ui/react";

import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  font: {
    dark: "#DEDDCD",
    light: "#111111",
  },
  brand: {
    dark: "#DEDDCD",
    light: "#111111",
  },
  background: {
    dark: "#111111",
    light: "#DEDDCD",
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

const components = {
  Text: {
    baseStyle: (props) => ({
      color: mode("font.light", "font.dark")(props),
    }),
  },
};

export const theme = extendTheme({
  config,
  colors,
  styles,
  components,
});
