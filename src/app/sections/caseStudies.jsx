"use client";
import { Box, useTheme } from "@chakra-ui/react";
import CaseStudiesTitle from "../components/caseStudiesTitle";
import { useColorMode } from "@chakra-ui/react";

function CaseStudies() {
  const { colorMode } = useColorMode();

  return (
    <Box>
      <CaseStudiesTitle />
      <Box
        height={["50vh", "75vh", "100vh"]}
        border={`1px solid ${useTheme().colors.stroke}`}
        borderTop={0}
        bg={`background.${colorMode}`}
      />
    </Box>
  );
}

export default CaseStudies;
