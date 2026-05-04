"use client";
import { Flex, Spinner } from "@chakra-ui/react";

function Loading() {
  return (
    <Flex
      position="absolute"
      justify="center"
      align="center"
      width="100vw"
      height="100vh"
      bg="bg"
      zIndex={100}
    >
      <Spinner
        borderWidth="4px"
        animationDuration="0.65s"
        color="fg"
        size="xl"
      />
    </Flex>
  );
}

export default Loading;
