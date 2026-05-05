"use client";
import { forwardRef } from "react";
import { motion } from "framer-motion";

import { Box, Skeleton } from "@chakra-ui/react";
import CaseStudiesTitle from "../components/caseStudiesTitle";
import { useDimensions } from "../../dimensions";
import { useColorMode } from "../color-mode";
import ShaderCanvas from "../components/shaderCanvas";
import Cards from "../components/cards";

const CaseStudies = forwardRef(function CaseStudies({ caseStudies }, ref) {
  const { height } = useDimensions();
  const { colorMode } = useColorMode();

  return (
    <Box
      ref={ref}
      scrollMarginTop={`calc(${height}vh + 2.5rem)`}
      bg="bg"
      borderRadius="2xl"
      overflow="hidden"
      position="relative"
    >
      <ShaderCanvas isDark={colorMode === "dark"} alpha={0.38} viewportAlign />
      {/* All content sits above the canvas */}
      <Box position="relative" zIndex={1}>
        <CaseStudiesTitle />
        {!caseStudies ? (
          <Box px={[4, 6, 8]} pb={6}>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} borderRadius="xl" height="12vh" mb={3} />
            ))}
          </Box>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Cards data={caseStudies} />
          </motion.div>
        )}
      </Box>
    </Box>
  );
});

export default CaseStudies;
