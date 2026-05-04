"use Client";
import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useDimensions } from "../../dimensions";

export const Button = ({ children, rightIcon, ...props }) => {
  const { height } = useDimensions();
  return (
    <Flex
      role="group"
      scrollMarginTop={`calc(${height}vh + 2.5rem)`}
      alignItems={"center"}
      borderTopWidth="1px"
      borderTopColor="stroke"
      w={"full"}
      height={"10vh"}
      fontWeight={"600"}
      fontSize={["md", "lg", "xl", "xl"]}
      transition="opacity 0.3s"
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 0.8, transition: "all 0.3s" }}
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
          flexShrink={0}
          transition="transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
          _groupHover={{ transform: "translateX(6px)" }}
        >
          <Icon as={rightIcon} w={6} h={6} color="fg" />
        </Box>
      )}
    </Flex>
  );
};
