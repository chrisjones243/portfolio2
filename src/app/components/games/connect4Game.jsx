"use client";
import { Flex, Text } from "@chakra-ui/react";

function Connect4Game() {
  return (
    <Flex
      direction="column"
      w="full"
      h="full"
      p={5}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text fontSize={["md", "lg", "xl", "2xl"]} fontWeight={"600"}>
        Undecided Game 👾
      </Text>
      <Text fontSize={["md", "lg", "xl", "2xl"]} fontWeight={"500"}>
        Coming soon! (or never)
      </Text>
    </Flex>
  );
}

export default Connect4Game;
