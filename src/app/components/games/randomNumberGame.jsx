"use client";
import React, { useEffect, useState } from "react";
import { Flex, Grid, Text, useTheme } from "@chakra-ui/react";
import Element from "./element";
import { Button } from "../button";

function RandomNumberGame() {
  return (
    <Flex
      direction="column"
      w="full"
      h="full"
      p={5}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text fontSize={["md", "lg", "xl", "2xl"]} fontWeight={"600"}>
        Random Number Game 🎲
      </Text>
      <Text fontSize={["md", "lg", "xl", "2xl"]} fontWeight={"500"}>
        Coming soon!
      </Text>
    </Flex>
  );
}

export default RandomNumberGame;
