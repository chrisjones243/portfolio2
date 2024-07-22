"use client";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    []
  );

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
  const isGamesOnScreen = useOnScreen(refs.GamesRef);
  const isContactOnScreen = useOnScreen(refs.ContactRef);

  return (
    <Box position="fixed" pl={10} top={["6", "10", "20"]}>
      <Text fontSize="large" fontWeight="bold" mb={6}>
        Contents
      </Text>
      <Text
        fontSize="md"
        pl={2}
        onClick={() => scrollTo(refs.HeroRef)}
        fontWeight={isHeroOnScreen ? "bold" : "normal"}
        cursor={"pointer"}
      >
        Hero
      </Text>
      <Text
        fontSize="md"
        pl={2}
        onClick={() => scrollTo(refs.CaseStudiesRef)}
        fontWeight={isCaseStudiesOnScreen ? "bold" : "normal"}
        cursor={"pointer"}
      >
        Case studies
      </Text>
      <Text
        fontSize="md"
        pl={2}
        onClick={() => scrollTo(refs.ExperienceRef)}
        fontWeight={isExperienceOnScreen ? "bold" : "normal"}
        cursor={"pointer"}
      >
        Selling point
      </Text>
      <Text
        fontSize="md"
        pl={2}
        onClick={() => scrollTo(refs.GamesRef)}
        fontWeight={isGamesOnScreen ? "bold" : "normal"}
        cursor={"pointer"}
      >
        Mini Games
      </Text>

      <Text
        fontSize="md"
        pl={2}
        onClick={() => scrollTo(refs.ContactRef)}
        fontWeight={isContactOnScreen ? "bold" : "normal"}
        cursor={"pointer"}
      >
        Contact
      </Text>
    </Box>
  );
}

export default Contents;
