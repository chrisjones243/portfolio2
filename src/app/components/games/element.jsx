"use client";

import { AspectRatio, Box } from "@chakra-ui/react";

const Element = ({ colour, onClick }) => {
  return (
    <AspectRatio ratio={1} h="full" w="full">
      <Box
        border={"1px solid"}
        borderColor={"stroke"}
        width="full"
        height="full"
        p={2}
        onClick={onClick}
      >
        <Box bg={colour} width="full" height="full" />
      </Box>
    </AspectRatio>
  );
};

export default Element;
