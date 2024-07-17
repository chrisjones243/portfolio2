"use client";
import { Flex, Text, Box, useTheme } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Contact() {
  const { colorMode } = useColorMode();
  const { height } = useDimensions();

  const [heading, setHeading] = useState(<Text>Contact</Text>);

  const handleClick = () => {
    setHeading(Title);
  };

  useEffect(() => {
    setHeading(Title);
  }, []);

  const fontStyles = {
    fontStyle: ["italic", "normal"],
    fontWeight: ["200", "400", "600", "800", "1000"],
  };

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const Title = ({ text = "Contact" }) => {
    return (
      <Flex direction="row">
        {text.split("").map((t, i) => (
          <Text
            key={i}
            fontStyle={fontStyles.fontStyle[random(0, 1)]}
            fontWeight={fontStyles.fontWeight[random(0, 4)]}
            fontSize={["md", "lg", "2xl", "4xl"]}
            m={0}
            p={0}
          >
            {t}
          </Text>
        ))}
      </Flex>
    );
  };

  return (
    <Flex direction="column">
      <Box onClick={handleClick} p={10} cursor={"pointer"}>
        {heading}
      </Box>
      <Box
        border={`1px solid ${useTheme().colors.stroke}`}
        bg={`background.${colorMode}`}
        height={"50vh"}
        mb={10}
      >
        {/* Add your contact form here */}
      </Box>
    </Flex>
  );
}

export default Contact;
