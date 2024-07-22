"use client";
import { forwardRef } from "react";

import { Box, useTheme } from "@chakra-ui/react";
import CaseStudiesTitle from "../components/caseStudiesTitle";
import { useColorMode } from "@chakra-ui/react";
import { useDimensions } from "../../dimensions";

import Cards from "../components/cards";

const CaseStudies = forwardRef(function CaseStudies(props, ref) {
  const { colorMode } = useColorMode();
  const { height } = useDimensions();

  return (
    <Box ref={ref} scrollMarginTop={`calc(${height}vh + 2.5rem)`}>
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
});

export default CaseStudies;
