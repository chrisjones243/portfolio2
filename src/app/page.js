"use client";

import {
  Heading,
  Text,
  Box,
  Image,
  Grid,
  GridItem,
  AspectRatio,
  useMediaQuery,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

function HomePage() {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Box>
      <Heading as="h1" size="2xl" textAlign="center">
        bcdhbcdh
      </Heading>
    </Box>
  );
}

export default HomePage;
