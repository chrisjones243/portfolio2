"use client";
import TranslatorUI from "./TranslatorUI";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useColorMode } from "../color-mode";
import ShaderCanvas from "../components/shaderCanvas";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export default function TranslatePage() {
  const router = useRouter();
  const { colorMode } = useColorMode();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <Box position="relative" minH="100vh" bg="bg" color="fg">
      {/* Background shader */}
      <Box position="fixed" inset={0} zIndex={0} pointerEvents="none">
        <ShaderCanvas isDark={colorMode === "dark"} alpha={0.28} />
      </Box>

      <Box
        position="relative"
        zIndex={1}
        mx={[5, 10, 20]}
        py={["3", "5", "10"]}
        pb={["20", "10", "10"]}
      >
        {/* Back button */}
        <motion.div {...fadeUp}>
          <Flex
            as="button"
            onClick={() => router.back()}
            display="inline-flex"
            alignItems="center"
            gap={2}
            opacity={0.5}
            _hover={{ opacity: 1 }}
            transition="opacity 0.2s"
            fontSize="sm"
            fontWeight="500"
            mb={40}
            cursor="pointer"
            background="none"
            border="none"
            color="fg"
          >
            <Icon as={BsArrowLeft} w={4} h={4} />
            <Text>Back</Text>
          </Flex>
        </motion.div>

        <Box maxW="900px" display="flex" flexDirection="column" gap={8}>
          {/* Header */}
          <motion.div {...fadeUp} style={{ transitionDelay: "0.05s" }}>
            <Box>
              <Text
                fontSize={["3xl", "4xl", "5xl"]}
                fontWeight="900"
                letterSpacing={-1}
                lineHeight="1"
              >
                En → Fr Translator
              </Text>
              <Text
                fontSize={["xs", "sm"]}
                fontWeight="400"
                letterSpacing={[2, 3]}
                mt={4}
                opacity={0.5}
                textTransform="uppercase"
              >
                Encoder-decoder transformer · trained from scratch on WMT14
              </Text>
            </Box>
          </motion.div>

          {/* Disclaimer */}
          <motion.div {...fadeUp} style={{ transitionDelay: "0.08s" }}>
            <Box
              borderWidth="1px"
              borderColor="stroke"
              borderRadius="xl"
              px={5}
              py={4}
            >
              <Text fontSize="xs" fontWeight="600" letterSpacing={3} textTransform="uppercase" opacity={0.4} mb={1}>
                Note
              </Text>
              <Text fontSize="sm" opacity={0.55} lineHeight="tall">
                This is a proof-of-concept modal trained with limited compute. So, translations won&rsquo;t be accurate and is intended for demonstration purposes only.
              </Text>
            </Box>
          </motion.div>

          {/* Translator widget */}
          <motion.div {...fadeUp} style={{ transitionDelay: "0.1s" }}>
            <TranslatorUI />
          </motion.div>

          {/* Tech note */}
          <motion.div {...fadeUp} style={{ transitionDelay: "0.15s" }}>
            <Box
              borderTopWidth="1px"
              borderColor="stroke"
              pt={6}
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <Text fontSize="xs" fontWeight="600" letterSpacing={3} textTransform="uppercase" opacity={0.4}>
                How it works
              </Text>
              <Text fontSize="sm" fontWeight="400" opacity={0.6} maxW="600px" lineHeight="tall">
                A 6-layer encoder-decoder transformer (512d, 8 heads, ~65M params) trained from scratch
                using PyTorch on the WMT14 English-French corpus. BPE tokenisation with a shared 32k
                vocabulary. Beam search decoding (width&nbsp;5) with length normalisation.
                Served on Modal&rsquo;s serverless infrastructure.
              </Text>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}
