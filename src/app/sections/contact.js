"use client";
import {
  Flex,
  Text,
  Input,
  useTheme,
  Box,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDimensions } from "../../dimensions";
import { forwardRef } from "react";

const Contact = forwardRef(function Contact(props, ref) {
  const { colorMode } = useColorMode();
  const { height } = useDimensions();
  const oppositeColor = colorMode === "light" ? "dark" : "light";

  const Button = ({ children, ...props }) => {
    return (
      <Box
        scrollMarginTop={`calc(${height}vh + 2.5rem)`}
        bg={`background.${oppositeColor}`}
        color={`font.${oppositeColor}`}
        display={"flex"}
        alignItems={"center"}
        pl={10}
        borderRadius={0}
        borderTop={`1px solid ${useTheme().colors.stroke}`}
        w={"full"}
        height={"10vh"}
        fontWeight={"600"}
        fontSize={["md", "lg", "xl", "xl"]}
        _hover={{
          opacity: 0.9,
          transition: "all 0.9s",
        }}
        _active={{
          opacity: 0.8,
          transition: "all 0.3s",
        }}
        {...props}
      >
        {children}
      </Box>
    );
  };

  return (
    <Grid
      ref={ref}
      templateColumns="repeat(2, 1fr)"
      w="full"
      h={`${height * 6}vh`}
      bg={`background.${colorMode}`}
      border={`1px solid ${useTheme().colors.stroke}`}
    >
      <GridItem>
        <Flex direction="column">
          <Flex h={`${height}vh`} pl={10} alignItems={"center"}>
            <Text
              fontStyle={"italic"}
              fontWeight={"500"}
              fontSize={["md", "lg", "2xl", "4xl"]}
            >
              Send Email
            </Text>
          </Flex>

          <Input
            placeholder="Email"
            h={`${height}vh`}
            borderRadius={0}
            border={0}
            borderTop={`1px solid ${useTheme().colors.stroke}`}
          />
          <Input
            placeholder="Subject"
            h={`${height}vh`}
            borderRadius={0}
            border={0}
            borderTop={`1px solid ${useTheme().colors.stroke}`}
          />
          <Input
            placeholder="Message"
            h={`${height * 2}vh`}
            borderRadius={0}
            border={0}
            borderTop={`1px solid ${useTheme().colors.stroke}`}
          />
          <Button>Send</Button>
        </Flex>
      </GridItem>
      <GridItem borderLeft={`1px solid ${useTheme().colors.stroke}`}>
        <Flex direction="column">
          <Flex h={`${height}vh`} pl={10} alignItems={"center"}>
            <Text
              fontStyle={"italic"}
              fontWeight={"500"}
              fontSize={["md", "lg", "2xl", "4xl"]}
            >
              Social Media
            </Text>
          </Flex>

          <Button onClick={() => window.open("https://www.linkedin.com/")}>
            LinkedIn
          </Button>
          <Button>GitHub</Button>
          <Button>Twitter</Button>
          <Button>Instagram</Button>
          <Button>Facebook</Button>
        </Flex>
      </GridItem>
    </Grid>
  );
});

export default Contact;
