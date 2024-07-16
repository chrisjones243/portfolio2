"use client";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

import { useDimensions } from "../../dimensions.js";

function Hero() {
  const { height, blockWidth } = useDimensions();

  const h = height * 100;
  console.log("Hero -> h", h);

  const { colorMode } = useColorMode();
  return (
    <Box
      border={`1px solid ${useTheme().colors.stroke}`}
      bg={`background.${colorMode}`}
      width="75%"
      height={h}
      fontSize={["md", "lg", "2xl", "4xl", "6xl", "5rem"]}
      padding={20}
      my={130}
      letterSpacing={4}
    >
      <Flex direction="row">
        <Text fontWeight={"400"}>I&#39;m</Text>
        <Text fontStyle={"italic"} fontWeight={"1000"}>
          &nbsp;Chris
        </Text>
        <Text fontWeight={"400"}>,</Text>
      </Flex>
      <Flex direction="row">
        <Text fontWeight={"400"}>a&nbsp;</Text>
        <Text fontWeight={"400"} letterSpacing={0}>
          university&nbsp;
        </Text>
        <Text fontWeight={"400"}>&nbsp;student,</Text>
      </Flex>
      <Flex direction="row">
        <Text fontWeight={"400"}>looking for a </Text>
        <Text fontStyle={"italic"} fontWeight={"1000"}>
          &nbsp;job
        </Text>
      </Flex>
    </Box>
  );
}

export default Hero;
