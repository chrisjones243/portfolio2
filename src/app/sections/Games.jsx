"use client";
import { forwardRef } from "react";
import {
  Flex,
  Text,
  Box,
  Tabs,
  TabList,
  Tab as ChakraTab,
  TabPanels,
  TabPanel,
  useTheme,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useDimensions } from "../../dimensions";
import MemoryGame from "../components/games/memoryGame";
import RandomNumberGame from "../components/games/randomNumberGame";
import Connect4Game from "../components/games/connect4Game";
import TicTacToeGame from "../components/games/ticTacToeGame";

const objects = [
  {
    title: "Random Number",
    component: <RandomNumberGame />,
  },
  {
    title: "Tic Tac Toe",
    component: <TicTacToeGame />,
  },
  {
    title: "Memory Game",
    component: <MemoryGame />,
  },
  {
    title: "🤷‍♂️",
    component: <Connect4Game />,
  },
];

const Games = forwardRef(function Games(props, ref) {
  const { colorMode } = useColorMode();
  const { height } = useDimensions();
  const theme = useTheme();

  const oppositeColor = colorMode === "light" ? "dark" : "light";

  const Tab = (props) => (
    <ChakraTab
      _selected={{
        color: `font.${oppositeColor}`,
        bg: `background.${oppositeColor}`,
      }}
      bg={`background.${colorMode}`}
      h="full"
      w={`100%`}
      {...props}
    />
  );

  return (
    <Flex
      ref={ref}
      direction="column"
      scrollMarginTop={`calc(${height}vh + 2.5rem)`}
      border={`1px solid ${useTheme().colors.stroke}`}
      bg={`background.${colorMode}`}
    >
      <Flex h={`${height}vh`} pl={10} alignItems={"center"} w={"full"}>
        <Text
          fontStyle={"italic"}
          fontWeight={"500"}
          fontSize={["md", "lg", "2xl", "4xl"]}
        >
          Mini Games
        </Text>
      </Flex>
      <Tabs>
        <TabList
          w={"100%"}
          h={`${height}vh`}
          overflowY={"scroll"}
          borderBottom={0}
          borderY={`1px solid ${theme.colors.stroke}`}
        >
          {objects.map((object, index) => {
            return (
              <Tab
                key={index}
                borderLeft={
                  index === 0 ? 0 : `1px solid ${theme.colors.stroke}`
                }
              >
                {object.title}
              </Tab>
            );
          })}
        </TabList>

        <TabPanels h={`${height * 5}vh`} overflowY={"scroll"}>
          {objects.map((object, index) => {
            return (
              <TabPanel h="50vh" key={index}>
                {/* <Box as="iframe" src={object.url} w="full" h="full" /> */}
                {object.component}
              </TabPanel>
            );
          })}
          <TabPanels />
        </TabPanels>
      </Tabs>
    </Flex>
  );
});

export default Games;
