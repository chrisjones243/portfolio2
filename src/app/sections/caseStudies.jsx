"use client";
import { Box, useTheme } from "@chakra-ui/react";
import CaseStudiesTitle from "../components/caseStudiesTitle";
import { useColorMode } from "@chakra-ui/react";

import Cards from "../components/cards";

function CaseStudies() {
  const { colorMode } = useColorMode();

  return (
    <Box>
      <CaseStudiesTitle />
      <Box
        // height={["50vh", "75vh", "75vh", "84vh"]}
        border={`1px solid ${useTheme().colors.stroke}`}
        borderTop={0}
        bg={`background.${colorMode}`}
      >
        <Cards />
      </Box>
    </Box>
  );
}

export default CaseStudies;
