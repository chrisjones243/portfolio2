"use client";
import { Box, Text, useTheme, Flex, Icon } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { FaExpandAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Img } from "./img";

function CollapsedCard({ data, onClick, setPos }) {
  const { colorMode } = useColorMode(); // Get the current color mode
  const [showInfo, setShowInfo] = useState(false);

  const { title, image } = data;

  const info = useRef(null);
  const entire = useRef(null);

  useEffect(() => {
    setPos({ x: entire?.current?.offsetLeft, y: entire?.current?.offsetTop });
    console.log(entire?.current?.offsetLeft, entire?.current?.offsetTop);
  }, []);

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
    <Flex
      ref={entire}
      width="100%"
      height="100%"
      border={`1px solid ${useTheme().colors.stroke}`}
      overflow={"hidden"}
      position="relative"
      zIndex={0}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
      onClick={onClick}
      as={motion.div}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      cursor={"pointer"}
    >
      <Box
        as={motion.div}
        variants={variants}
        initial="notHovering"
        animate={showInfo ? "hovering" : "notHovering"}
        width="100%"
        height="100%"
        bg={`background.${colorMode}`}
        position="absolute"
        top={0}
        left={0}
      />
      <Img
        src={image}
        alt={title}
        width={300}
        height={200}
        minH="100%"
        minW="100%"
        objectFit="cover"
      />

      <Flex
        ref={info}
        as={motion.div}
        initial="hidden"
        animate={showInfo ? "visible" : "hidden"}
        variants={variants}
        bottom={-info?.current?.offsetHeight}
        bg={`background.${colorMode}`}
        borderTop={`1px solid ${useTheme().colors.stroke}`}
        width="100%"
        p={3}
        position={"absolute"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text
          fontSize="md"
          alignSelf={"Flex-end"}
          // width={"100%"}
        >
          {title}
        </Text>
        <Icon as={FaExpandAlt} />
      </Flex>
    </Flex>
  );
}

export default CollapsedCard;
