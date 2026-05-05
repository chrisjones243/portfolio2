"use client";
import { forwardRef } from "react";
import { Flex, Text, Tabs, useMediaQuery, Box } from "@chakra-ui/react";
import { useColorMode } from "../color-mode";
import { useDimensions } from "../../dimensions";
import ShaderCanvas from "../components/shaderCanvas";
import MemoryGame from "../components/games/memoryGame";
import RandomNumberGame from "../components/games/randomNumberGame";
import Connect4Game from "../components/games/connect4Game";
import TicTacToeGame from "../components/games/ticTacToeGame";

const objects = [
  { title: "Random Number", component: <RandomNumberGame /> },
  { title: "Tic Tac Toe", component: <TicTacToeGame /> },
  { title: "Memory Game", component: <MemoryGame /> },
  { title: "🤷‍♂️", component: <Connect4Game /> },
];

const Games = forwardRef(function Games(props, ref) {
  const { colorMode } = useColorMode();
  const { height } = useDimensions();

  const [isLessThan1050] = useMediaQuery("(max-width: 1050px)");

  const oppositeColor = colorMode === "light" ? "dark" : "light";

  return (
    <Flex
      ref={ref}
      direction="column"
      scrollMarginTop={`calc(${height}vh + 2.5rem)`}
      bg="bg"
      borderRadius="2xl"
      overflow="hidden"
      position="relative"
    >
      <ShaderCanvas isDark={colorMode === "dark"} alpha={0.38} viewportAlign />
      <Box position="relative" zIndex={1} display="flex" flexDirection="column">
        <Flex
          h={`${height}vh`}
          pl={isLessThan1050 ? 5 : 10}
          alignItems={"center"}
          w={"full"}
        >
          <Text
            fontWeight={"900"}
            fontSize={["md", "lg", "2xl", "4xl"]}
          >
            Mini Games
          </Text>
        </Flex>
        <Tabs.Root defaultValue={objects[0].title}>
          <Tabs.List
            w={"100%"}
            h={`${height}vh`}
            overflowY={"scroll"}
            bg="transparent"
            borderTopWidth="1px"
            borderTopColor="stroke"
            borderBottomWidth="1px"
            borderBottomColor="stroke"
          >
            {objects.map((object, index) => {
              return (
                <Tabs.Trigger
                  key={index}
                  value={object.title}
                  borderLeftWidth={index === 0 ? 0 : "1px"}
                  borderLeftColor="stroke"
                  fontSize={["xs", "sm", "md", "md"]}
                  _selected={{ color: "fgInverse", bg: "bgInverse" }}
                  bg="transparent"
                  h="full"
                  w="100%"
                >
                  {object.title}
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>

          <Flex
            h={isLessThan1050 ? `${height * 6}vh` : `${height * 5}vh`}
            overflowY={"scroll"}
            bg="transparent"
          >
            {objects.map((object, index) => {
              return (
                <Tabs.Content value={object.title} h="50vh" key={index}>
                  {object.component}
                </Tabs.Content>
              );
            })}
          </Flex>
        </Tabs.Root>
      </Box>
    </Flex>
  );
});

export default Games;
