"use client";
import { Image, AspectRatio, Box, useTheme } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

import React from "react";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // Get the current color mode

  const logo = colorMode === "light" ? "logo-dark.svg" : "logo-light.svg";

  return (
    <Box
      position="fixed"
      top={["3", "5", "10"]}
      left={0}
      px={[5, 10, 20]}
      width="full"
      onClick={toggleColorMode}
    >
      <Box
        width={"calc(20% + 1px)"}
        border={`1px solid ${useTheme().colors.stroke}`}
        bg={`background.${colorMode}`}
      >
        <AspectRatio
          ratio={422.28 / 435.38}
          w="40px"
          h="40px"
          margin={4}
          alignSelf={"flex-start"}
          justifySelf={"flex-start"}
        >
          <Image src={logo} alt="Logo" />
        </AspectRatio>
      </Box>
    </Box>
  );
};

export default NavBar;
