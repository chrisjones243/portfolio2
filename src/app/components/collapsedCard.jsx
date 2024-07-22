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

import { useDimensions } from "../../dimensions";

function CollapsedCard({ data, onClick }) {
  const { colorMode } = useColorMode(); // Get the current color mode
  const oppositeColor = colorMode === "light" ? "dark" : "light";
  const [showInfo, setShowInfo] = useState(false);

  const rightArrow = createIcon({
    displayName: "rightArrow",
    viewBox: "0 0 123 16",
    path: (
      <path
        d="M122.713 8.7012C123.1 8.30741 123.095 7.67427 122.701 7.28704L116.284 0.976777C115.89 0.589548 115.257 0.594869 114.87 0.988661C114.482 1.38245 114.488 2.0156 114.881 2.40282L120.586 8.01194L114.977 13.7161C114.589 14.1099 114.595 14.7431 114.988 15.1303C115.382 15.5175 116.015 15.5122 116.403 15.1184L122.713 8.7012ZM0.00840306 10.0252L122.008 9.00003L121.991 7.0001L-0.00840306 8.0253L0.00840306 10.0252Z"
        fill="currentColor"
      />
    ),
  });

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
      borderLeft={`1px solid ${useTheme().colors.stroke}`}
      bg={`background.${colorMode}`}
      templateColumns="repeat(3, 1fr)"
    >
      <GridItem colSpan={2} display={"flex"} alignItems={"center"} pl={10}>
        <Text fontStyle={"italic"} fontWeight={600} fontSize={25}>
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
      >
        <Icon as={rightArrow} w="full" />
      </GridItem>
    </Grid>
  );
}

export default CollapsedCard;
