"use client";
import React, { use, useEffect, useState } from "react";
import { Flex, Input, Text } from "@chakra-ui/react";
import Element from "./element";
import { Button } from "../button";

function RandomNumberGame() {
  const [value, setValue] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const [isGreater, setIsGreater] = useState(false);
  const [isLess, setIsLess] = useState(false);

  const [finished, setFinished] = useState(false);

  const [userTries, setUserTries] = useState(0);
  const [computerTries, setComputerTries] = useState(0);

  useEffect(() => {
    playAgain();
  }, []);

  const playAgain = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(randomNumber);
    setComputerTries(binarySearch(randomNumber));
    setValue(null);
    setUserTries(0);
    setFinished(false);
    setIsGreater(false);
    setIsLess(false);
  };

  const binarySearch = (value) => {
    let low = 1;
    let high = 100;
    let mid = 0;
    let tries = 0;
    while (low <= high) {
      mid = Math.floor((low + high) / 2);
      if (mid === value) {
        return tries;
      } else if (mid < value) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
      tries++;
    }
    return tries;
  };

  const onSubmit = () => {
    if (value === randomNumber) {
      setFinished(true);
    } else {
      if (value > randomNumber) {
        setIsGreater(false);
        setIsLess(true);
      } else {
        setIsLess(false);
        setIsGreater(true);
      }
      setUserTries(userTries + 1);
    }
  };
  return (
    <Flex
      direction="column"
      w="full"
      h="full"
      justifyContent={"center"}
      alignItems={"center"}
      p={[5, 10, 20, 40]}
    >
      <Text fontSize={["md", "lg", "xl", "2xl"]} fontWeight={"600"}>
        Guess the Random Number between 1 and 100 🎲
      </Text>
      <Text fontSize={["md", "lg", "xl", "2xl"]} fontWeight={"500"} pb={10}>
        and beat the computer!
      </Text>
      {isGreater && (
        <Text fontSize={["md", "lg", "xl", "2xl"]} fontWeight={"500"}>
          It's greater than {value} 🔼
        </Text>
      )}
      {isLess && (
        <Text fontSize={["md", "lg", "xl", "2xl"]} fontWeight={"500"}>
          It's less than {value} 🔽
        </Text>
      )}
      {randomNumber && !finished && (
        <Flex direction="column" w={"50%"} mt={2}>
          <Input
            type="number"
            placeholder="Enter your guess"
            mb={10}
            borderRadius={0}
            borderColor={"stroke"}
            value={value}
            onChange={(e) => {
              setIsGreater(false);
              setIsLess(false);
              const input = e.target.value;
              const number = parseInt(input);
              if (!isNaN(number) || input === "") {
                setValue(number);
              }
            }}
          />
          <Button
            onClick={onSubmit}
            border={"1px solid"}
            borderColor={"stroke"}
            height={12}
            justifyContent={"center"}
          >
            Submit
          </Button>
        </Flex>
      )}
      {finished && (
        <Flex direction="column" w={"50%"} mt={2}>
          <Text
            fontSize={["md", "lg", "xl", "2xl"]}
            fontWeight={"600"}
            align={"center"}
            mb={10}
          >
            {randomNumber}
          </Text>
          <Text
            fontSize={["md", "lg", "xl", "xl"]}
            fontWeight={"500"}
            align={"center"}
            mb={10}
          >
            Congratulations! You guessed the number in {userTries} goes. The
            computer guessed it in {computerTries} goes.
          </Text>
          <Button
            onClick={() => {
              playAgain();
            }}
            border={"1px solid"}
            borderColor={"stroke"}
            height={12}
            justifyContent={"center"}
          >
            Play Again
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default RandomNumberGame;
