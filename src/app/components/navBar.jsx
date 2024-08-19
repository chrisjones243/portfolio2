"use client";
import { Flex, Icon, Box, useColorMode, useMediaQuery } from "@chakra-ui/react";
import React from "react";

import { useDimensions } from "../../dimensions";
import { Logo } from "./icons";

const NavBar = () => {
  const [isLessThan500] = useMediaQuery("(max-width: 500px)");
  const { colorMode, toggleColorMode } = useColorMode(); // Get the current color mode

  const { height, blockWidth } = useDimensions();

  return (
    <Box
      position="fixed"
      top={["3", "5", "10"]}
      left={0}
      px={[5, 10, 20]}
      width="full"
      zIndex={10}
    >
      <Flex
        border={"1px"}
        borderColor={`stroke`}
        bg={`background.${colorMode}`}
        onClick={toggleColorMode}
        h={`${height}vh`}
        width={blockWidth}
        alignItems={"center"}
        justifyContent={isLessThan500 ? "center" : "flex-start"}
      >
        <Icon as={Logo} w={10} h={10} m={4} color={`brand.${colorMode}`} />
      </Flex>
    </Box>
  );
};

export default NavBar;
