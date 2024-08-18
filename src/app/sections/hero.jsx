"use client";
import { Box, Text, Flex, GridItem, Grid } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

import { useDimensions } from "../../dimensions.js";

import { forwardRef } from "react";

const Hero = forwardRef(function Hero(props, ref) {
  const { height, blockWidth } = useDimensions();

  const h = height * 8;

  const oppositeColor = useColorMode().colorMode === "light" ? "dark" : "light";

  const { colorMode, sections } = useColorMode();
  return (
    <Grid
      ref={ref}
      scrollMarginTop={`calc(${height}vh + 2.5rem)`}
      templateColumns="repeat(4, 1fr)"
      border={`1px solid ${useTheme().colors.stroke}`}
      bg={`background.${colorMode}`}
      // width="75%"
      h={`${h}vh`}
      fontSize={["lg", "2xl", "4xl", "6xl", "5rem"]}
      letterSpacing={4}
    >
      <GridItem
        colSpan={3}
        p={10}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
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
      </GridItem>
      <GridItem colSpan={1} bg={`background.${oppositeColor}`} />
    </Grid>
  );
});

export default Hero;
