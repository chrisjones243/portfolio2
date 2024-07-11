"use client";
import { Box, Text, useTheme, Flex, Icon } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { PortableText } from "@portabletext/react";
import { Img } from "./img";

import { FaExternalLinkAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function ExpandedCard({ data, setClose, isOpen }) {
  const [mouseOverClose, setMouseOverClose] = useState(false);
  const { colorMode } = useColorMode(); // Get the current color mode
  const stroke = useTheme().colors.stroke;

  const { title, description, image } = data;

  const entire = useRef(null);

  const handleClose = () => {
    console.log("Close");
    enableScroll();
    setClose();
  };

  const components = {
    block: ({ children }) => (
      <Text fontStyle={"italic"} fontWeight={500}>
        {children}
      </Text>
    ),
  };

  function disableScroll() {
    // Get the current page scroll position
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    // if any scroll is attempted,
    // set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    window.onscroll = function () {};
  }

  if (isOpen) {
    disableScroll();

    return (
      <Box position="fixed" zIndex={10} as={motion.div}>
        <Box
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9, transition: { duration: 0.3 } }}
          exit={{ opacity: 0 }}
          width="100%"
          height="100%"
          bg={`background.${colorMode}`}
          position="fixed"
          top={0}
          left={0}
          zIndex={-1}
          onClick={handleClose}
          overflow={"hidden"}
        />
        <Flex
          ref={entire}
          width="60vw"
          height="60vh"
          border={`1px solid ${stroke}`}
          overflow={"hidden"}
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={0}
          as={motion.div}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.3 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 5 },
          }}
        >
          <Flex
            as={motion.div}
            variants={{ default: { opacity: 1 }, focus: { opacity: 0.5 } }}
            initial="default"
            animate={mouseOverClose ? "focus" : "default"}
            onMouseEnter={() => setMouseOverClose(true)}
            onMouseLeave={() => setMouseOverClose(false)}
            position={"absolute"}
            top={0}
            right={0}
            bg={`background.${colorMode}`}
            width={10}
            height={10}
            borderBottom={`1px solid ${stroke}`}
            borderLeft={`1px solid ${stroke}`}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={handleClose}
            cursor={"pointer"}
          >
            <Icon
              as={IoClose}
              color={`text.${colorMode}`}
              width="100%"
              height="100%"
              p={2}
            />
          </Flex>
          <Img
            src={image}
            alt={title}
            width={2360 / 6}
            height={2360 / 6}
            minW={"100%"}
            minH={"100%"}
            objectFit={"cover"}
          />
          <Flex
            bottom={0}
            bg={`background.${colorMode}`}
            borderTop={`1px solid ${stroke}`}
            width="100%"
            p={3}
            position={"absolute"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <PortableText components={components} value={description} s />

            <Icon as={FaExternalLinkAlt} cursor={"pointer"} />
          </Flex>
        </Flex>
      </Box>
    );
  }

  enableScroll();
  return null;
}

export default ExpandedCard;
