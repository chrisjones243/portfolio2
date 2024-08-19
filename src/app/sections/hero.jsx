"use client";
import { Text, Flex, GridItem, Grid, useMediaQuery } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

import { useDimensions } from "../../dimensions.js";

import { forwardRef } from "react";

const Hero = forwardRef(function Hero(props, ref) {
  const { height, blockWidth } = useDimensions();
  const [isLessThan1050] = useMediaQuery("(max-width: 1050px)");

  const h = height * 8;

  const oppositeColor = useColorMode().colorMode === "light" ? "dark" : "light";

  const { colorMode } = useColorMode();
  return (
    <Grid
      ref={ref}
      scrollMarginTop={`calc(${height}vh + 2.5rem)`}
      templateColumns="repeat(4, 1fr)"
      border={`1px solid ${useTheme().colors.stroke}`}
      bg={`background.${colorMode}`}
      h={isLessThan1050 ? null : `${h}vh`}
      fontSize={["2xl", "4xl", "5xl", "5xl", "6xl", "5rem"]}
      letterSpacing={isLessThan1050 ? 2 : 4}
    >
      <GridItem
        colSpan={isLessThan1050 ? 4 : 3}
        p={10}
        pl={isLessThan1050 ? 5 : 10}
        display={"flex"}
        justifyContent={isLessThan1050 ? null : "center"}
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
      {isLessThan1050 ? null : (
        <GridItem colSpan={1} bg={`background.${oppositeColor}`} />
      )}
    </Grid>
  );
});

export default Hero;
