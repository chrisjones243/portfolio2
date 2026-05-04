"use client";
import { Box, Text } from "@chakra-ui/react";

export default function CaseStudyLinks({ links }) {
  if (!links?.length) return null;

  return (
    <Box mt={8}>
      <Text
        fontWeight="bold"
        fontSize="sm"
        mb={3}
        opacity={0.4}
        letterSpacing="0.05em"
        textTransform="uppercase"
      >
        Links
      </Text>
      <Box display="flex" flexDirection="column" gap={2}>
        {links.map((link, i) => (
          <Box
            key={link._key ?? i}
            as="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            fontSize="sm"
            fontWeight={500}
            opacity={0.6}
            textDecoration="underline"
            textUnderlineOffset="3px"
            textDecorationColor="currentColor"
            _hover={{ opacity: 1, textDecoration: "underline" }}
            transition="opacity 0.2s"
            display="block"
          >
            {link.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
