"use client";
import {
  Flex,
  Text,
  Input,
  useTheme,
  Box,
  Grid,
  GridItem,
  Textarea,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDimensions } from "../../dimensions";
import { forwardRef } from "react";
import { RightArrow } from "../components/icons";
import { Button } from "../components/button";

import SendEmail from "../components/sendEmail";

const Contact = forwardRef(function Contact(props, ref) {
  const { colorMode } = useColorMode();
  const { height } = useDimensions();
  const oppositeColor = colorMode === "light" ? "dark" : "light";

  return (
    <Grid
      ref={ref}
      templateColumns="repeat(2, 1fr)"
      w="full"
      h={`${height * 6}vh`}
      bg={`background.${colorMode}`}
      border={`1px solid ${useTheme().colors.stroke}`}
      overflow={"hidden"}
    >
      <GridItem>
        <SendEmail />
        {/* <Flex direction="column">
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
            // isInvalid
          />
          <Input
            placeholder="Subject"
            h={`${height}vh`}
            borderRadius={0}
            border={0}
            borderTop={`1px solid ${useTheme().colors.stroke}`}
            // isInvalid
          />
          <Textarea
            placeholder="Message"
            h={`${height * 2}vh`}
            resize={"none"}
            borderRadius={0}
            border={0}
            borderTop={`1px solid ${useTheme().colors.stroke}`}
            // isInvalid
          />
          <Button
            rightIcon={RightArrow}
            borderBottom={`1px solid ${useTheme().colors.stroke}`}
          >
            Send
          </Button>
        </Flex> */}
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
          <Button>Leetcode</Button>
          <Button>Instagram</Button>
          <Button borderBottom={`1px solid ${useTheme().colors.stroke}`}>
            {" "}
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
});

export default Contact;
