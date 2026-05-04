"use client";

import { AspectRatio, Box } from "@chakra-ui/react";

const Element = ({ colour, onClick }) => {
  return (
    <AspectRatio ratio={1} w="full">
      <Box
        border="1px solid"
        borderColor="stroke"
        width="full"
        height="full"
        p={1.5}
        onClick={onClick}
        cursor="pointer"
        transition="transform 0.15s, opacity 0.2s"
        _hover={{ opacity: 0.85, transform: "scale(1.05)" }}
        _active={{ transform: "scale(0.95)" }}
        borderRadius="md"
      >
        <Box
          bg={colour}
          width="full"
          height="full"
          borderRadius="sm"
          transition="background 0.25s"
        />
      </Box>
    </AspectRatio>
  );
};

export default Element;
