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
    <Box
      ref={ref}
      scrollMarginTop={`calc(${height}vh + 2.5rem)`}
      border={`1px solid ${useTheme().colors.stroke}`}
      bg={`background.${colorMode}`}
    >
      <CaseStudiesTitle />
      <Cards />
    </Box>
  );
});

export default CaseStudies;
