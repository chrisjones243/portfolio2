"use client";
import { Flex, Text, Grid, GridItem, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorMode } from "../color-mode";
import { useDimensions } from "../../dimensions";
import { forwardRef } from "react";
import ShaderCanvas from "../components/shaderCanvas";
import SendEmail from "../components/sendEmail";

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/chris-paul-jones" },
  { label: "GitHub", href: "https://github.com/chrisjones243" },
  { label: "LeetCode", href: "https://leetcode.com/u/ChrisJones/" },
  { label: "Instagram", href: "https://www.instagram.com/c_jone5/" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

function SocialRow({ label, href, delay, borderBottom }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ flex: 1, display: "flex", flexDirection: "column" }}
    >
      <Flex
        as="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        role="group"
        borderTopWidth="1px"
        borderTopColor="stroke"
        borderBottomWidth={borderBottom ? "1px" : "0"}
        borderBottomColor="stroke"
        flex="1"
        minH="10vh"
        px={10}
        alignItems="center"
        justifyContent="space-between"
        cursor="pointer"
        bg="transparent"
        color="fg"
        transition="background 0.25s ease, color 0.25s ease"
        _hover={{ bg: "fg", color: "bg" }}
      >
        <Text fontWeight="600" fontSize={["md", "lg", "xl"]} color="inherit">{label}</Text>
      </Flex>
    </motion.div>
  );
}

const Contact = forwardRef(function Contact({ resumeUrl }, ref) {
  const { height } = useDimensions();
  const { colorMode } = useColorMode();

  const allLinks = resumeUrl
    ? [...SOCIALS, { label: "CV / Resume", href: resumeUrl }]
    : SOCIALS;

  return (
    <Box
      ref={ref}
      w="full"
      bg="bg"
      overflow="hidden"
      borderRadius="2xl"
      position="relative"
    >
      <ShaderCanvas isDark={colorMode === "dark"} alpha={0.38} viewportAlign />

      <Grid
        templateColumns={["1fr", "1fr", "1fr 1fr"]}
        position="relative"
        zIndex={1}
      >
        {/* Left — contact form */}
        <GridItem
          borderRightWidth={["0", "0", "1px"]}
          borderRightColor="stroke"
          borderBottomWidth={["1px", "1px", "0"]}
          borderBottomColor="stroke"
        >
          <motion.div {...fadeUp}>
            <Box px={10} pt={10} pb={6}>
              <Text
                fontWeight="900"
                fontSize={["2xl", "3xl", "4xl", "5xl"]}
                lineHeight="1.1"
              >
                Get in touch.
              </Text>
              <Text
                mt={2}
                opacity={0.45}
                fontSize={["xs", "sm"]}
                textTransform="uppercase"
                letterSpacing="wider"
              >
                I&apos;d love to hear from you
              </Text>
            </Box>
          </motion.div>
          <SendEmail />
        </GridItem>

        {/* Right — social links */}
        <GridItem display="flex" flexDirection="column">
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
          >
            <Box px={10} pt={10} pb={6}>
              <Text
                fontWeight="900"
                fontSize={["2xl", "3xl", "4xl", "5xl"]}
                lineHeight="1.1"
              >
                Connect.
              </Text>
              <Text
                mt={2}
                opacity={0.45}
                fontSize={["xs", "sm"]}
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Find me online
              </Text>
            </Box>
          </motion.div>

          <Flex direction="column" flex="1">
            {allLinks.map((s, i) => (
              <SocialRow
                key={s.label}
                label={s.label}
                href={s.href}
                delay={0.15 + i * 0.07}
                borderBottom={i === allLinks.length - 1}
              />
            ))}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
});

export default Contact;
