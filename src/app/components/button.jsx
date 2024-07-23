"use Client";
import React from "react";
import { Button as ChakraButton, Box, Flex, Icon } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { useDimensions } from "../../dimensions";

export const Button = ({ children, rightIcon, ...props }) => {
  const { height } = useDimensions();
  const oppositeColor = useTheme().colorMode === "light" ? "dark" : "light";
  return (
    <Flex
      scrollMarginTop={`calc(${height}vh + 2.5rem)`}
      bg={`background.${oppositeColor}`}
      color={`font.${oppositeColor}`}
      display={"flex"}
      alignItems={"center"}
      borderRadius={0}
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
      {children}

      {rightIcon && (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          width="30%"
          height="full"
        >
          <Icon as={rightIcon} w="full" />
        </Box>
      )}
    </Flex>
  );
};
