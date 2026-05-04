"use client";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useColorMode } from "../color-mode";
import { BsMoon, BsSun, BsController } from "react-icons/bs";
import Link from "next/link";

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(() => {
    if (typeof IntersectionObserver !== "undefined") {
      return new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      );
    } else {
      // Fallback logic when IntersectionObserver is not available
      return {
        observe: () => {},
        disconnect: () => {},
      };
    }
  }, []);

  useEffect(() => {
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [observer, ref]);

  return isIntersecting;
}

const scrollTo = (ref) => {
  ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
};
function Contents({ refs }) {
  const isHeroOnScreen = useOnScreen(refs.HeroRef);
  const isCaseStudiesOnScreen = useOnScreen(refs.CaseStudiesRef);
  const isExperienceOnScreen = useOnScreen(refs.ExperienceRef);
  const isContactOnScreen = useOnScreen(refs.ContactRef);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position="fixed" pl={10} top={["6", "10", "20"]}>
      <Text fontSize="large" fontWeight="bold" mb={6}>
        Contents
      </Text>
      <Text
        fontSize="md"
        pl={2}
        borderLeftWidth="2px"
        borderLeftColor={isHeroOnScreen ? "fg" : "transparent"}
        color={isHeroOnScreen ? "fg" : "gray.500"}
        transition="all 0.2s"
        onClick={() => scrollTo(refs.HeroRef)}
        fontWeight={isHeroOnScreen ? "bold" : "normal"}
        cursor={"pointer"}
      >
        Hero
      </Text>
      <Text
        fontSize="md"
        pl={2}
        borderLeftWidth="2px"
        borderLeftColor={isCaseStudiesOnScreen ? "fg" : "transparent"}
        color={isCaseStudiesOnScreen ? "fg" : "gray.500"}
        transition="all 0.2s"
        onClick={() => scrollTo(refs.CaseStudiesRef)}
        fontWeight={isCaseStudiesOnScreen ? "bold" : "normal"}
        cursor={"pointer"}
      >
        Case studies
      </Text>
      <Text
        fontSize="md"
        pl={2}
        borderLeftWidth="2px"
        borderLeftColor={isExperienceOnScreen ? "fg" : "transparent"}
        color={isExperienceOnScreen ? "fg" : "gray.500"}
        transition="all 0.2s"
        onClick={() => scrollTo(refs.ExperienceRef)}
        fontWeight={isExperienceOnScreen ? "bold" : "normal"}
        cursor={"pointer"}
      >
        Experience
      </Text>

      <Text
        fontSize="md"
        pl={2}
        borderLeftWidth="2px"
        borderLeftColor={isContactOnScreen ? "fg" : "transparent"}
        color={isContactOnScreen ? "fg" : "gray.500"}
        transition="all 0.2s"
        onClick={() => scrollTo(refs.ContactRef)}
        fontWeight={isContactOnScreen ? "bold" : "normal"}
        cursor={"pointer"}
      >
        Contact
      </Text>

      {/* Controls row: theme toggle + easter egg */}
      <Flex mt={8} gap={2} alignItems="center">
        <Flex
          w={8}
          h={8}
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          cursor="pointer"
          onClick={toggleColorMode}
          aria-label="Toggle colour mode"
          role="button"
          color="gray.500"
          _hover={{ color: "fg" }}
          transition="color 0.2s"
        >
          <Icon as={colorMode === "dark" ? BsSun : BsMoon} w={4} h={4} />
        </Flex>
        <Flex
          as={Link}
          href="/games"
          w={8}
          h={8}
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          cursor="pointer"
          aria-label="Mini games"
          color="gray.500"
          _hover={{ color: "fg" }}
          transition="color 0.2s"
          title="Mini games"
        >
          <Icon as={BsController} w={4} h={4} />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Contents;
