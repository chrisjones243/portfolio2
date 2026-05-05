"use client";
import { Flex, Text, Grid, GridItem, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useDimensions } from "../../dimensions";
import { forwardRef } from "react";
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
        color="fgInverse"
        transition="background 0.25s ease, color 0.25s ease"
        _hover={{ bg: "fgInverse", color: "bgInverse" }}
      >
        <Text fontWeight="600" fontSize={["md", "lg", "xl"]} color="inherit">{label}</Text>
      </Flex>
    </motion.div>
  );
}

const Contact = forwardRef(function Contact({ resumeUrl }, ref) {
  const { height } = useDimensions();

  const allLinks = resumeUrl
    ? [...SOCIALS, { label: "CV / Resume", href: resumeUrl }]
    : SOCIALS;

  return (
    <Flex
      ref={ref}
      direction="column"
      gap={[4, 4, 0]}
      w="full"
    >
      <Grid
        templateColumns={["1fr", "1fr", "1fr 1fr"]}
        position="relative"
        zIndex={1}
        bg="bgInverse"
        color="fgInverse"
        overflow="hidden"
        borderRadius="2xl"
      >
        {/* Left — contact form */}
        <GridItem
          borderRightWidth={["0", "0", "1px"]}
          borderRightColor="stroke"
          bg={["bgInverse", "bgInverse", "transparent"]}
          borderRadius={["2xl", "2xl", "0"]}
          overflow="hidden"
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

        {/* Right — social links (desktop only in this Grid) */}
        <GridItem display={["none", "none", "flex"]} flexDirection="column">
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
                borderBottom={false}
              />
            ))}
          </Flex>
        </GridItem>
      </Grid>

      {/* Right — social links (mobile only, separate box) */}
      <Box
        display={["block", "block", "none"]}
        bg="bgInverse"
        color="fgInverse"
        borderRadius="2xl"
        overflow="hidden"
      >
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
        >
          <Box px={10} pt={10} pb={6}>
            <Text
              fontWeight="900"
              fontSize={["2xl", "3xl"]}
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
        <Flex direction="column">
          {allLinks.map((s, i) => (
            <SocialRow
              key={s.label}
              label={s.label}
              href={s.href}
              delay={0.15 + i * 0.07}
              borderBottom={false}
            />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
});

export default Contact;
