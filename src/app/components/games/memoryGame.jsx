"use client";
import React, { useEffect, useState } from "react";
import { Flex, Grid, Text } from "@chakra-ui/react";
import Element from "./element";
import { Button } from "../button";

function MemoryGame() {
  const [elements, setElements] = useState([]);
  const [matched, setMathced] = useState(0);
  const [score, setScore] = useState(0);

  const inActive = "gray.600";

  const setActive = (id) => {
    let tempElements = elements;
    let activeElements = tempElements.filter((element) => element.active);
    if (activeElements.length === 2) {
      if (activeElements[0].colour === activeElements[1].colour) {
        tempElements = tempElements.map((element) => {
          if (element.active) {
            element.paired = true;
            element.active = false;
          }
          return element;
        });
      } else {
        tempElements = tempElements.map((element) => {
          element.active = false;
          return element;
        });
        setScore(score + 1); // Increase the score when the user gets it wrong
      }
    }
    tempElements = tempElements.map((element) => {
      if (element.id === id) {
        element.active = true;
      }
      return element;
    });
    setElements(tempElements);
    let activeColours = tempElements.filter((element) => element.active);
    if (activeColours.length === 2) {
      if (activeColours[0].colour === activeColours[1].colour) {
        setMathced(matched + 1);
      }
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
    <Flex direction={["column", "row", "row"]} height={"100%"}>
      <Flex
        direction="column"
        justifyContent="center"
        width={["100%", "20%", "30%"]}
        alignItems={"center"}
      >
        <Text pb={2}> Matched: {matched}/6</Text>
        <Text pb={2} fontWeight={"bold"}>
          {" "}
          Penalty: {score}{" "}
        </Text>
        {matched === 6 && (
          <Button
            onClick={randomAssign}
            border={"1px solid"}
            borderColor={"stroke"}
            height={12}
            justifyContent={"center"}
          >
            Reset
          </Button>
        )}
      </Flex>
      <Grid
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(4, 1fr)",
          "repeat(4, 1fr)",
          "repeat(6, 1fr)",
        ]}
        gap={10}
        w={"full"}
        h={"full"}
        p={[2, 5, 10]}
      >
        {elements.map((element) => (
          <Element
            key={element.id}
            colour={
              element.active || element.paired ? element.colour : inActive
            }
            onClick={() => setActive(element.id)}
          />
        ))}
      </Grid>
    </Flex>
  );
}

export default MemoryGame;
