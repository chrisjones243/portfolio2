"use client";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

function Hero() {
  const { colorMode } = useColorMode();
  return (
    <Box
      border={`1px solid ${useTheme().colors.stroke}`}
      bg={`background.${colorMode}`}
      width="75%"
      fontSize={["md", "lg", "2xl", "4xl", "6xl", "5rem"]}
      padding={20}
      my={20}
      // letterSpacing={4}
    >
      <Flex direction="row">
        <Text fontWeight={"400"}>I&#39;m</Text>
        <Text fontStyle={"italic"} fontWeight={"1000"}>
          &nbsp; Chris
        </Text>
        <Text fontWeight={"400"}>,</Text>
      </Flex>
      <Text fontWeight={"400"}> a student,</Text>
      <Flex direction="row">
        <Text fontWeight={"400"}>looking for a </Text>
        <Text fontStyle={"italic"} fontWeight={"1000"}>
          &nbsp; job
        </Text>
      </Flex>
    </Box>
  );
}

export default Hero;
