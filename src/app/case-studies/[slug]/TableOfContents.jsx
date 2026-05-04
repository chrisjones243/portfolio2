"use client";
import { useEffect, useRef, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

// Slugify matching rehype-slug behaviour
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseHeadings(markdown) {
  if (!markdown) return [];
  const headingRe = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRe.exec(markdown)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].replace(/`([^`]+)`/g, "$1"), // strip inline code markers for display
      id: slugify(match[2].replace(/`([^`]+)`/g, "$1")),
    });
  }
  return headings;
}

export default function TableOfContents({ markdown }) {
  const [activeId, setActiveId] = useState(null);
  const headings = parseHeadings(markdown);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!headings.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdown]);

  if (!headings.length) return null;

  return (
    <Box mb={8}>
      <Text
        fontWeight="bold"
        fontSize="sm"
        mb={4}
        opacity={0.5}
        letterSpacing="0.05em"
        textTransform="uppercase"
      >
        On this page
      </Text>
      <Box as="nav" display="flex" flexDirection="column">
        {headings.map(({ id, text, level }) => (
          <Text
            key={id}
            as="a"
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              setActiveId(id);
            }}
            pl={2}
            ml={level === 1 ? 0 : level === 2 ? 3 : 5}
            fontSize={level === 1 ? "sm" : "xs"}
            fontWeight={activeId === id ? "bold" : "normal"}
            color={activeId === id ? "fg" : "gray.500"}
            borderLeftWidth="2px"
            borderLeftColor={activeId === id ? "fg" : "transparent"}
            transition="all 0.2s"
            _hover={{ color: "fg", textDecoration: "none" }}
            display="block"
            cursor="pointer"
          >
            {text}
          </Text>
        ))}
      </Box>
    </Box>
  );
}
