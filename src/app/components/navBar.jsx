"use client";
import { Flex, Icon, Box } from "@chakra-ui/react";
import { useColorMode } from "../color-mode";
import React from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useDimensions } from "../../dimensions";
import { Logo } from "./icons";
import { BsMoon, BsSun, BsController } from "react-icons/bs";
import Link from "next/link";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { height } = useDimensions();
  const { scrollYProgress } = useScroll();

  const rotateDeg = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const maskImage = useMotionTemplate`conic-gradient(from -90deg, black 0deg, black ${rotateDeg}deg, transparent ${rotateDeg}deg)`;

  const bgColor = "var(--nav-bg)";
  const ring = "var(--nav-ring)";

  const pillH = `${height * 0.65}vh`;

  return (
    <Box
      position="fixed"
      top={["3", "5", "10"]}
      left={0}
      px={[5, 10, 20]}
      width="full"
      zIndex={10}
      pointerEvents="none"
    >
      <Flex gap={3} alignItems="center">
        {/* Logo pill — click scrolls to top / hero */}
        <Flex
          bg={bgColor}
          style={{ backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
          boxShadow={ring}
          h={pillH}
          w={["25%", "25%", "20%"]}
          alignItems="center"
          justifyContent="flex-start"
          position="relative"
          overflow="hidden"
          borderRadius="xl"
          transition="background 0.4s"
          pointerEvents="auto"
          cursor="pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          role="button"
        >
          <Icon as={Logo} w={8} h={8} ml={4} color="fg" />
          <Box
            as={motion.div}
            style={{ maskImage, WebkitMaskImage: maskImage }}
            position="absolute"
            inset={0}
            borderRadius="xl"
            borderWidth="1.5px"
            borderColor="fg"
            opacity={0.7}
            pointerEvents="none"
          />
        </Flex>

        {/* Mobile-only controls pill: theme toggle + games */}
        <Flex
          display={["flex", "flex", "none"]}
            bg={bgColor}
            style={{ backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
            boxShadow={ring}
            h={pillH}
            px={3}
            gap={1}
            alignItems="center"
            borderRadius="xl"
            transition="background 0.4s"
            pointerEvents="auto"
          >
            <Flex
              w={9}
              h={9}
              alignItems="center"
              justifyContent="center"
              borderRadius="lg"
              cursor="pointer"
              onClick={toggleColorMode}
              color="fg"
              opacity={0.6}
              _hover={{ opacity: 1 }}
              transition="opacity 0.2s"
              role="button"
              aria-label="Toggle colour mode"
            >
              <Icon as={colorMode === "dark" ? BsSun : BsMoon} w={4} h={4} />
            </Flex>
            <Flex
              as={Link}
              href="/games"
              w={9}
              h={9}
              alignItems="center"
              justifyContent="center"
              borderRadius="lg"
              cursor="pointer"
              color="fg"
              opacity={0.6}
              _hover={{ opacity: 1 }}
              transition="opacity 0.2s"
              aria-label="Mini games"
            >
              <Icon as={BsController} w={4} h={4} />
            </Flex>
          </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;

