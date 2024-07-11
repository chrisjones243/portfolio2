"use client";
import { Flex, Text, Box, useTheme } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

function Games() {
  const { colorMode } = useColorMode();

  return (
    <Flex direction="column">
      <Text
        fontStyle={"italic"}
        fontWeight={"500"}
        fontSize={["md", "lg", "2xl", "4xl"]}
        m={10}
      >
        Mini Games
      </Text>
      <Box
        border={`1px solid ${useTheme().colors.stroke}`}
        bg={`background.${colorMode}`}
        height={"50vh"}
        mb={10}
      >
        {/* Add your mini games here */}
      </Box>
      <Box
        border={`1px solid ${useTheme().colors.stroke}`}
        bg={`background.${colorMode}`}
        height={"50vh"}
        mb={10}
      >
        {/* Add your mini games here */}
      </Box>
      <Box
        border={`1px solid ${useTheme().colors.stroke}`}
        bg={`background.${colorMode}`}
        height={"50vh"}
        mb={10}
      >
        {/* Add your mini games here */}
      </Box>
    </Flex>
  );
}

export default Games;
