"use client";
import { Box, Text, useTheme, Grid, GridItem, Icon } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Img } from "./img";
import { useDimensions } from "../../dimensions";

function CollapsedCard({ data, onClick }) {
  const { colorMode } = useColorMode(); // Get the current color mode
  const oppositeColor = colorMode === "light" ? "dark" : "light";
  const [showInfo, setShowInfo] = useState(false);

  const rightArrow = "right-arrow.svg";

  const { height } = useDimensions();

  const { title, image } = data;

  const info = useRef(null);

  const variants = {
    hidden: {
      y: 0,
      opacity: 0,
      transition: { duration: 0.3, type: "tween", delay: 0.1 },
    },
    visible: {
      y: -info?.current?.offsetHeight,
      opacity: 1,
      transition: { duration: 0.3, type: "tween", delay: 0.1 },
    },
    hovering: {
      opacity: 0.25,
    },
    notHovering: {
      opacity: 0,
    },
  };

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
      border={`1px solid ${useTheme().colors.stroke}`}
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
        color={"black"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Icon as={"right-arrow.svg"} />
      </GridItem>
    </Grid>
  );
}

export default CollapsedCard;
