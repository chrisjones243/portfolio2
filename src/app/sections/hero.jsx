"use client";
import { Text, GridItem, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useDimensions } from "../../dimensions.js";
import { useColorMode } from "../color-mode";
import { forwardRef } from "react";
import ShaderCanvas from "../components/shaderCanvas";

const Hero = forwardRef(function Hero({ availableForWork }, ref) {
  const { height } = useDimensions();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const h = height * 8;

  return (
    <Grid
      ref={ref}
      scrollMarginTop={`calc(${height}vh + 2.5rem)`}
      templateColumns="repeat(4, 1fr)"
      bg="bg"
      position="relative"
      overflow="hidden"
      borderRadius="2xl"
      h={[null, null, `clamp(420px, ${h}vh, calc(320px + 28vw))`]}
      fontSize={["2xl", "4xl", "5xl", "5xl", "6xl", "5rem"]}
      letterSpacing={[2, 2, 4]}
    >
      <ShaderCanvas isDark={isDark} alpha={0.38} viewportAlign />
      <GridItem
        colSpan={[4, 4, 3]}
        p={10}
        pl={[5, 5, 10]}
        display="flex"
        justifyContent={[null, null, "center"]}
        flexDirection="column"
        position="relative"
        zIndex={1}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Text fontWeight={"900"}>
            Christopher Jones
          </Text>
          <Text
            fontSize={["xs", "sm", "md", "lg"]}
            fontWeight={"400"}
            letterSpacing={[2, 3, 4]}
            mt={[3, 4, 6]}
            opacity={0.5}
            textTransform="uppercase"
          >
            Software Developer &amp; ML Engineer
          </Text>
        </motion.div>
      </GridItem>
      <GridItem
          colSpan={1}
          bg="bgInverse"
          position="relative"
          zIndex={1}
          display={["none", "none", "flex"]}
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-end"
          pb={10}
          gap={3}
        >
          {availableForWork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}
            >
              {/* Pulsing availability dot */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0px 0px #4ade8066",
                    "0 0 0px 6px #4ade8033",
                    "0 0 0px 0px #4ade8000",
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#4ade80", flexShrink: 0 }}
              />
              <Text
                color="fgInverse"
                fontSize="2xs"
                fontWeight="600"
                letterSpacing={3}
                textTransform="uppercase"
                textAlign="center"
                lineHeight="short"
              >
                Available
                <br />
                for work
              </Text>
            </motion.div>
          )}
        </GridItem>
    </Grid>
  );
});

export default Hero;
