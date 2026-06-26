"use client";
import { Grid, GridItem, Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useSafeBack } from "../../hooks/useSafeBack";
import { TAG_COLORS } from "../../components/tagColors";
import { useColorMode } from "../../color-mode";
import ShaderCanvas from "../../components/shaderCanvas";
import CaseStudyHero from "./CaseStudyHero";
import MarkdownRenderer from "./MarkdownRenderer";
import TableOfContents from "./TableOfContents";
import CaseStudyLinks from "./CaseStudyLinks";

export default function CaseStudyClient({ data }) {
  const { title, markdown, links, imageUrl, videoUrl, tags } = data;
  const back = useSafeBack();
  const { colorMode } = useColorMode();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <Box position="relative" minH="100vh" bg="bg" color="fg" zIndex={1}>
      {/* Global shader pinned to viewport — matches home page */}
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
      {/* Header: back link then title, stacked left */}
      <Box mb={4}>
        <Flex
            as="button"
            onClick={() => back()}
            alignItems="center"
            gap={2}
            opacity={0.5}
            _hover={{ opacity: 1 }}
            transition="opacity 0.2s"
            fontSize={["sm", "md"]}
            fontWeight="500"
            mb={40}
            cursor="pointer"
            background="none"
            border="none"
            color="fg"
          >
            <Icon as={BsArrowLeft} w={4} h={4} />
            <Text>Case Studies</Text>
          </Flex>
        <Text
          fontWeight={900}
          fontSize={["2xl", "3xl", "4xl", "5xl"]}
          lineHeight="1.1"
          textAlign="left"
          mb={4}
        >
          {title}
        </Text>
        {tags?.length > 0 && (
          <Flex gap={3} flexWrap="wrap" mb={10} mt={2}>
            {tags.map((tag) => (
              <Flex key={tag} alignItems="center" gap={1.5} opacity={0.7}>
                <Box
                  w="8px"
                  h="8px"
                  borderRadius="full"
                  flexShrink={0}
                  style={{ backgroundColor: TAG_COLORS[tag] ?? "#888888" }}
                />
                <Text fontSize="sm" fontWeight={500} letterSpacing={0.5}>
                  {tag}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}
      </Box>

      <CaseStudyHero imageUrl={imageUrl} videoUrl={videoUrl} />

      {/* Two-column content area */}
      <Grid
        templateColumns={["1fr", "1fr", "3fr 1fr"]}
        gap={0}
        maxW="100%"
        alignItems="start"
        mt={[8, 10, 14]}
      >
        {/* Left: markdown body (3/4) */}
        <GridItem pr={[0, 0, 14]}>
          <MarkdownRenderer markdown={markdown} />
        </GridItem>

        {/* Right: sticky ToC + curated links (1/4) */}
        <GridItem
          pl={[0, 0, 8]}
          pt={[10, 10, 0]}
          position={["relative", "relative", "sticky"]}
          top={["auto", "auto", "2rem"]}
          alignSelf="start"
        >
          <Box
            bg="bg"
            borderRadius="2xl"
            overflow="hidden"
            position="relative"
          >
            <ShaderCanvas isDark={colorMode === "dark"} alpha={0.38} viewportAlign />
            <Box position="relative" zIndex={1} p={6}>
              <TableOfContents markdown={markdown} />
              {links?.length > 0 && <CaseStudyLinks links={links} />}
            </Box>
          </Box>
        </GridItem>
      </Grid>
      </Box>
    </Box>
  );
}
