"use client";
import { Box } from "@chakra-ui/react";

import Card from "./card";
import { AnimatePresence } from "framer-motion";

function Cards({ data }) {
  return (
    <Box>
      <AnimatePresence>
        {data?.map((item, i) => (
          <Card data={item} key={i} />
        ))}
      </AnimatePresence>
    </Box>
  );
}

export default Cards;
