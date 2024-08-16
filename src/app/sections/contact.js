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
import { IoIosDownload } from "react-icons/io";
import { DownArrow, RightArrow } from "../components/icons";
import { Button } from "../components/button";
import { client } from "../../client";

import SendEmail from "../components/sendEmail";

const Contact = forwardRef(function Contact(props, ref) {
  const { colorMode } = useColorMode();
  const { height } = useDimensions();

  const [resume, setResume] = useState();

  const getResume = async () => {
    const res = await client.fetch(`*[_type == "resume"][0]{
    "fileUrl": file.asset->url,
  }`);
    setResume(res);
  };

  useEffect(() => {
    getResume();
  }, []);

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

          <Button
            onClick={() =>
              window.open("https://linkedin.com/in/chris-paul-jones")
            }
          >
            LinkedIn
          </Button>
          <Button
            onClick={() => window.open("https://github.com/chrisjones243")}
          >
            GitHub
          </Button>
          <Button
            onClick={() => window.open("https://leetcode.com/u/ChrisJones/")}
          >
            Leetcode
          </Button>
          <Button
            onClick={() => window.open("https://www.instagram.com/c_jone5/")}
          >
            Instagram
          </Button>
          <Button
            borderBottom={`1px solid ${useTheme().colors.stroke}`}
            rightIcon={resume ? RightArrow : null}
            onClick={() => {
              if (resume) {
                window.open(resume.fileUrl);
              }
            }}
          >
            {resume ? "CV" : null}
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
});

export default Contact;
