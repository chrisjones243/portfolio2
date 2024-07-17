"use client";
import {
  Flex,
  Icon,
  Box,
  useTheme,
  createIcon,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

import { useDimensions } from "../../dimensions";

const Logo = createIcon({
  displayName: "Logo",
  viewBox: "0 0 422.28 435.38",
  path: (
    <g>
      <path
        fill="currentColor"
        d="m216.86,18.18c0-10.28-8.94-18.25-19.16-17.14C110.06,10.58,41.86,84.82,41.86,175c0,90.18,68.21,164.42,155.84,173.96,10.22,1.11,19.16-6.86,19.16-17.14V18.18Z"
      />
      <path
        fill="currentColor"
        d="m302.06,17.24v400.72c0,9.52-7.72,17.24-17.24,17.24h-55.93c-25.13.92-82.39-.47-141.99-34.91-33.09-19.13-56.25-42.29-71.42-60.81-6.32-7.71-4.72-19.17,3.41-24.94,9.33-6.61,19.7-13.96,25.89-18.34,1.9-1.34,3.79-2.68,5.69-4.02,7.32-5.18,17.41-3.9,23.16,2.99,8.44,10.12,19.32,21.02,33.18,31.08,37.94,27.53,78.25,34.31,103.99,35.62,9.84.5,18.09-7.36,18.09-17.22V17.24c0-9.52,7.72-17.24,17.24-17.24h38.69c9.52,0,17.24,7.72,17.24,17.24Z"
      />
    </g>
  ),
});

const NavBar = () => {
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
        border={`1px solid ${useTheme().colors.stroke}`}
        bg={`background.${colorMode}`}
        onClick={toggleColorMode}
        h={`${height}vh`}
        width={blockWidth}
        alignItems={"center"}
      >
        <Icon as={Logo} w={10} h={10} m={4} color={`brand.${colorMode}`} />
      </Flex>
    </Box>
  );
};

export default NavBar;
