"use Client";
import React from "react";
import { Box, Flex, Icon, Text, useColorMode } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { useDimensions } from "../../dimensions";

export const Button = ({ children, rightIcon, ...props }) => {
  const { height } = useDimensions();
  const { colorMode } = useColorMode(); // Get the current color mode
  return (
    <Flex
      scrollMarginTop={`calc(${height}vh + 2.5rem)`}
      alignItems={"center"}
      borderTop={`1px solid ${useTheme().colors.stroke}`}
      w={"full"}
      height={"10vh"}
      fontWeight={"600"}
      fontSize={["md", "lg", "xl", "xl"]}
      _hover={{
        opacity: 0.9,
        transition: "all 0.9s",
      }}
      _active={{
        opacity: 0.8,
        transition: "all 0.3s",
      }}
      cursor={"pointer"}
      justifyContent={"space-between"}
      px={10}
      {...props}
    >
      <Text>{children}</Text>

      {rightIcon && (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          width="30%"
          height="full"
        >
          <Icon as={rightIcon} w="full" color={`brand.${colorMode}`} />
        </Box>
      )}
    </Flex>
  );
};
