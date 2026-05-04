"use client";
import { Box, Flex, Grid, GridItem, Text, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { useColorMode } from "../color-mode";
import ShaderCanvas from "../components/shaderCanvas";
import TicTacToeGame from "../components/games/ticTacToeGame";
import MemoryGame from "../components/games/memoryGame";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

function GamePanel({ title, description, delay, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ height: "100%" }}
    >
      <Box
        bg="bg"
        borderRadius="2xl"
        overflow="hidden"
        borderWidth="1px"
        borderColor="stroke"
        h="full"
        display="flex"
        flexDirection="column"
      >
        <Box px={8} pt={8} pb={4}>
          <Text fontWeight="900" fontSize={["xl", "2xl", "3xl"]} lineHeight="1.1">
            {title}
          </Text>
          {description && (
            <Text mt={1} opacity={0.45} fontSize="sm" textTransform="uppercase" letterSpacing="wider">
              {description}
            </Text>
          )}
        </Box>
        <Box px={8} pb={8} flex={1} display="flex" flexDirection="column">
          {children}
        </Box>
      </Box>
    </motion.div>
  );
}

export default function GamesPage() {
  const { colorMode } = useColorMode();

  return (
    <Box position="relative" minH="100vh" bg="bg">
      <ShaderCanvas isDark={colorMode === "dark"} alpha={0.15} />

      <Box
        position="relative"
        zIndex={1}
        mx={[5, 10, 20]}
        py={["3", "5", "10"]}
        pb={["20", "10", "10"]}
      >
        {/* Back link */}
        <motion.div {...fadeUp}>
          <Flex
            as={Link}
            href="/"
            display="inline-flex"
            alignItems="center"
            gap={2}
            opacity={0.5}
            _hover={{ opacity: 1 }}
            transition="opacity 0.2s"
            mb={10}
            fontSize="sm"
            fontWeight="500"
          >
            <Icon as={BsArrowLeft} w={4} h={4} />
            <Text>Back</Text>
          </Flex>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          <Text fontWeight="900" fontSize={["3xl", "4xl", "6xl"]} lineHeight="1" mb={2}>
            🕹️ Mini Games
          </Text>
        </motion.div>

        {/* Games grid */}
        <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={6} alignItems="stretch">
          <GridItem>
            <GamePanel
              title="Tic Tac Toe"
              description="Pick your player settings" 
              delay={0.1}
            >
              <TicTacToeGame />
            </GamePanel>
          </GridItem>
          <GridItem>
            <GamePanel
              title="Memory"
              description="Match all the pairs"
              delay={0.18}
            >
              <MemoryGame />
            </GamePanel>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
