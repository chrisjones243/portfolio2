"use client";
import { Flex, Text, Icon, useMediaQuery } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useState, useRef, forwardRef, useEffect } from "react";
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

  const [isLessThan1050] = useMediaQuery("(max-width: 1050px)");

  const [currentLang, setCurrentLang] = useState(0);

  // Use a ref to throttle the mouse move event handling
  const throttleTimeout = useRef(null);

  useEffect(() => {
    let interval;
    if (isLessThan1050) {
      interval = setInterval(() => {
        setCurrentLang(Math.floor(Math.random() * langs.length));
      }, 250); // Adjust the interval time as needed
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLessThan1050]);

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
      height={isLessThan1050 ? `${height * 5}vh` : `${height * 7}vh`}
      border={`1px`}
      borderColor={`stroke`}
      bg={`background.${colorMode}`}
      onMouseMove={handleMouseMove}
      onClick={handleMouseMove}
      direction={"column"}
    >
      <Flex
        height={isLessThan1050 ? `${height * 4}vh` : `${height * 6}vh`}
        direction={"column"}
        mx={10}
        fontSize={["3xl", "3xl", "4xl", "6xl", "6xl", "4.5rem"]}
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
