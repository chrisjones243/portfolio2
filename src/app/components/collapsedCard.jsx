"use client";
import {
  Box,
  Text,
  useTheme,
  Grid,
  GridItem,
  Icon,
  createIcon,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { RightArrow } from "./icons";

import { useDimensions } from "../../dimensions";

function CollapsedCard({ data, onClick, ...props }) {
  const { colorMode } = useColorMode(); // Get the current color mode
  const oppositeColor = colorMode === "light" ? "dark" : "light";
  const [showInfo, setShowInfo] = useState(false);

  const { height } = useDimensions();

  const { title } = data;

  const info = useRef(null);

  return (
    <Grid
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
      onClick={onClick}
      as={motion.div}
      whileHover={{ opacity: 0.9 }}
      whileTap={{ opacity: 0.8 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      cursor={"pointer"}
      height={`${height}vh`}
      width="100%"
      borderTop={`1px solid ${useTheme().colors.stroke}`}
      // borderLeft={`1px solid ${useTheme().colors.stroke}`}
      // bg={`background.${colorMode}`}
      templateColumns="repeat(3, 1fr)"
      {...props}
    >
      <GridItem
        colSpan={2}
        display={"flex"}
        alignItems={"center"}
        pl={[5, 7, 10]}
      >
        <Text fontStyle={"italic"} fontWeight={600} fontSize={[15, 20, 25]}>
          {title}
        </Text>
      </GridItem>
      <GridItem
        colSpan={1}
        bg={`background.${oppositeColor}`}
        color={`font.${oppositeColor}`}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        p={[2, 3, 4]}
      >
        <Icon as={RightArrow} w="full" />
      </GridItem>
    </Grid>
  );
}

export default CollapsedCard;
