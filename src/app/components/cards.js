"use client";
import { Grid, GridItem } from "@chakra-ui/react";

import Card from "./card";
import { AnimatePresence } from "framer-motion";

function Cards() {
  return (
    <>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={4}
        height="100%"
        py={10}
        px={40}
      >
        <AnimatePresence>
          {Array.from({ length: 6 }).map((_, i) => (
            <GridItem colSpan={1} key={i}>
              <Card />
            </GridItem>
          ))}
        </AnimatePresence>
      </Grid>
    </>
  );
}

export default Cards;
