"use client";
import { Flex, Text, Box, Icon, useTheme } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useState, useRef, forwardRef } from "react";
import { useDimensions } from "../../dimensions";

import { BsCursor } from "react-icons/bs";

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

const Experience = forwardRef(function Experience(props, ref) {
  const { colorMode } = useColorMode();
  const oppositeColor = colorMode === "light" ? "dark" : "light";
  const { height } = useDimensions();

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
      ref={ref}
      scrollMarginTop={`calc(${height}vh + 2.5rem)`}
      height={`${height * 7}vh`}
      border={`1px solid ${useTheme().colors.stroke}`}
      bg={`background.${colorMode}`}
      onMouseMove={handleMouseMove}
      onClick={handleMouseMove}
      direction={"column"}
    >
      <Flex
        height={`${height * 6}vh`}
        direction={"column"}
        mx={10}
        fontSize={["2xl", "3xl", "4.5rem"]}
        letterSpacing={3}
        justifyContent={"center"}
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

      <Flex
        width={"full"}
        height={`${height}vh`}
        bg={`background.${oppositeColor}`}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <Icon
          as={BsCursor}
          color={`brand.${oppositeColor}`}
          m={10}
          height={6}
          width={6}
        />
      </Flex>
    </Flex>
  );
});

export default Experience;
