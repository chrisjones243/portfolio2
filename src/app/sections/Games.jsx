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

const exampleObjects = [
  {
    title: "Game of Life",
    description: "This is a description of game 1",
    url: "https://codepen.io/infinitestack/embed/xxoOKzd?default-tab=html%2Cresult",
  },
  {
    title: "Card",
    description: "This is a description of game 2",
    url: "https://codepen.io/tsuhre/embed/WNqxevY?default-tab=html%2Cresult",
  },
  {
    title: "Tower Blocks",
    description: "This is a description of game 3",
    url: "https://codepen.io/ste-vg/embed/ppLQNW?default-tab=html%2Cresult",
  },
  {
    title: "Memory Game",
    description: "This is a description of game 4",
    url: "https://codesandbox.io/embed/memory-game-forked-y7kc27?autoresize=1&fontsize=14&hidenavigation=1&theme=dark",
  },
];

const Games = forwardRef(function Games(props, ref) {
  const { colorMode } = useColorMode();
  const { height } = useDimensions();

  const oppositeColor = colorMode === "light" ? "dark" : "light";

  const Tab = (props) => (
    <ChakraTab
      _selected={{
        color: `font.${oppositeColor}`,
        bg: `background.${oppositeColor}`,
      }}
      borderTop={`1px solid ${useTheme().colors.stroke}`}
      borderX={`1px solid ${useTheme().colors.stroke}`}
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
    >
      <Flex
        h={`${height}vh`}
        pl={10}
        alignItems={"center"}
        w={"full"}
        borderTop={`1px solid ${useTheme().colors.stroke}`}
        borderX={`1px solid ${useTheme().colors.stroke}`}
      >
        <Text
          fontStyle={"italic"}
          fontWeight={"500"}
          fontSize={["md", "lg", "2xl", "4xl"]}
        >
          Mini Games
        </Text>
      </Flex>
      <Tabs>
        <TabList w={"100%"} h={`${height}vh`} overflowY={"scroll"}>
          {exampleObjects.map((object, index) => {
            return <Tab key={index}>{object.title}</Tab>;
          })}
        </TabList>

        <TabPanels h={`${height * 5}vh`} overflowY={"scroll"}>
          {exampleObjects.map((object, index) => {
            return (
              <TabPanel
                border={`1px solid ${useTheme().colors.stroke}`}
                bg={`background.${colorMode}`}
                h="50vh"
                key={index}
              >
                <Box as="iframe" src={object.url} w="full" h="full" />
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
