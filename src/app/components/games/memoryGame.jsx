"use client";
import React, { useEffect, useState } from "react";
import { Flex, Grid, Text } from "@chakra-ui/react";
import { useColorMode } from "../../color-mode";
import Element from "./element";
import { Button } from "../button";

function MemoryGame() {
  const [elements, setElements] = useState([]);
  const [matched, setMathced] = useState(0);
  const [score, setScore] = useState(0);
  const { colorMode } = useColorMode();

  const inActive = colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100";

  const setActive = (id) => {
    // Always deep-copy so React sees a new reference and re-renders
    let tempElements = elements.map(el => ({ ...el }));
    let activeElements = tempElements.filter((element) => element.active);
    if (activeElements.length === 2) {
      if (activeElements[0].colour === activeElements[1].colour) {
        tempElements = tempElements.map((element) => {
          if (element.active) {
            return { ...element, paired: true, active: false };
          }
          return element;
        });
      } else {
        tempElements = tempElements.map((element) => ({ ...element, active: false }));
        setScore(score + 1);
      }
    }
    tempElements = tempElements.map((element) => {
      if (element.id === id && !element.paired) {
        return { ...element, active: true };
      }
      return element;
    });
    setElements(tempElements);
    const activeColours = tempElements.filter((el) => el.active);
    if (activeColours.length === 2 && activeColours[0].colour === activeColours[1].colour) {
      setMathced(matched + 1);
    }
  };

  const randomAssign = () => {
    let colours = [
      "red.600",
      "blue.600",
      "green.600",
      "yellow.600",
      "purple.600",
      "orange.600",
      "red.600",
      "blue.600",
      "green.600",
      "yellow.600",
      "purple.600",
      "orange.600",
    ];
    let tempElements = [];
    setMathced(0);
    setScore(0);
    for (let i = 0; i < 12; i++) {
      let randomIndex = Math.floor(Math.random() * colours.length);
      let colour = colours[randomIndex];
      colours.splice(randomIndex, 1);
      tempElements.push({
        id: i, // Use the index as a unique key
        colour: colour,
        active: false,
        paired: false,
      });
    }
    setElements(tempElements);
  };

  useEffect(() => {
    randomAssign();
  }, []);

  return (
    <Flex direction="column" w="full" h="full" gap={4} pt={4} flex={1}>
      {/* Stats row */}
      <Flex direction="row" gap={6} alignItems="center" justifyContent="space-between">
        <Flex gap={4}>
          <Text fontSize="sm" opacity={0.7}>Matched: <Text as="span" fontWeight="700" opacity={1}>{matched}/6</Text></Text>
          <Text fontSize="sm" opacity={0.7}>Penalties: <Text as="span" fontWeight="700" opacity={1} color={score > 0 ? "red.400" : "fg"}>{score}</Text></Text>
        </Flex>
        {matched === 6 && (
          <Button
            onClick={randomAssign}
            borderWidth="1px"
            borderColor="stroke"
            height={9}
            px={5}
            fontSize="sm"
            justifyContent="center"
          >
            Play again
          </Button>
        )}
      </Flex>
      {/* Card grid */}
      <Grid
        templateColumns="repeat(6, 1fr)"
        gap={2}
        w="full"
        flex={1}
      >
        {elements.map((element) => (
          <Element
            key={element.id}
            colour={element.active || element.paired ? element.colour : inActive}
            onClick={() => setActive(element.id)}
          />
        ))}
      </Grid>
    </Flex>
  );
}

export default MemoryGame;
