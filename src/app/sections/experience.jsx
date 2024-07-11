"use client";
import { Flex, Text, useTheme } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useState, useRef } from "react";

const langs = [
  "Javascript",
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "Haskell",
  "SQL",
  "TypeScript",
  "C",
  "Visual Basic",
];
const langsColor = [
  "red.300",
  "yellow.300",
  "red.500",
  "blue.500",
  "orange.500",
  "green.500",
  "purple.500",
  "cyan.500",
  "teal.500",
  "pink.500",
  "gray.500",
];

function Experience() {
  const { colorMode } = useColorMode();

  const [currentLang, setCurrentLang] = useState(0);

  // Use a ref to throttle the mouse move event handling
  const throttleTimeout = useRef(null);

  const handleMouseMove = () => {
    if (
      !throttleTimeout.current ||
      throttleTimeout.current === null ||
      throttleTimeout.current === undefined ||
      throttleTimeout.current < 0
    ) {
      throttleTimeout.current = setTimeout(() => {
        setCurrentLang(Math.floor(Math.random() * langs.length));
        throttleTimeout.current = null;
      }, 150); // Adjust the throttle time as needed
    }
  };

  return (
    <Flex
      height={["50vh", "75vh", "75vh", "70vh"]}
      width={"full"}
      my={60}
      border={`1px solid ${useTheme().colors.stroke}`}
      bg={`background.${colorMode}`}
      alignItems={"center"}
      onMouseMove={handleMouseMove}
    >
      <Flex
        direction={"column"}
        mx={10}
        fontSize={["2xl", "3xl", "4.5rem"]}
        letterSpacing={3}
        width={"full"}
      >
        <Flex>
          <Text fontStyle={"italic"} fontWeight={"600"}>
            Incredible
          </Text>
          <Text fontWeight={"200"}>&nbsp;at</Text>
        </Flex>
        <Text
          fontWeight={"800"}
          color={langsColor[currentLang]}
          lineHeight={0.7}
        >
          {langs[currentLang]}
        </Text>
      </Flex>
    </Flex>
  );
}

export default Experience;
