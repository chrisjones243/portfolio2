"use client";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Link,
} from "@chakra-ui/react";
import { useDimensions } from "../../dimensions";

import NavBar from "./navBar";
import Contents from "./contents";
import ShaderCanvas from "./shaderCanvas";
import { useColorMode } from "../color-mode";

function Layout({ children, scrollTo, refs }) {
  const width = "calc(100% - 5)";
  const { height } = useDimensions();
  const { colorMode } = useColorMode();

  return (
    <Box
      position="relative"
      mx={[5, 10, 20]}
      py={["3", "5", "10"]}
      pb={["20", "10", "10"]}
      width={width}
      bg="bg"
      minH="100vh"
      zIndex={1}
    >
      {/* Global barely-visible shader pinned to the viewport */}
      <Box
        position="fixed"
        inset={0}
        zIndex={0}
        pointerEvents="none"
      >
        <ShaderCanvas isDark={colorMode === "dark"} alpha={0.28} />
      </Box>
      <Grid templateColumns="repeat(5, 1fr)}">
        <GridItem colSpan={[5, 5, 4]}>
          <NavBar />
          <Box height={`${height}vh`} />
          <Box>{children}</Box>
        </GridItem>
        <GridItem colSpan={1} display={["none", "none", "block"]}>
          <Contents scrollTo={scrollTo} refs={refs} />
        </GridItem>
      </Grid>
      <Text
        fontSize={["xs", "xs", "sm"]}
        textAlign="center"
        width={"100%"}
        px={[5, 10, 20]}
        pb={2}
        position={"absolute"}
        bottom={0}
        left={0}
        color={"gray.500"}
      >
        {" "}
        This site is protected by reCAPTCHA,{" "}
        <Link
          fontSize={["xs", "xs", "sm"]}
          href="https://policies.google.com/privacy"
          color={"gray.500"}
          isExternal
        >
          Privacy Policy
        </Link>{" "}
        and {""}
        <Link
          fontSize={["xs", "xs", "sm"]}
          href="https://policies.google.com/terms"
          color={"gray.500"}
          isExternal
        >
          {" "}
          Terms of Service
        </Link>{" "}
        apply.
      </Text>
    </Box>
  );
}

export default Layout;
