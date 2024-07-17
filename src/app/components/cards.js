"use client";
import { Grid, GridItem } from "@chakra-ui/react";

import Card from "./card";
import { AnimatePresence } from "framer-motion";

function Cards() {
  return (
    <>
      <Grid
        templateColumns="repeat(4, 1fr)"
        // py={10}
        // px={40}
      >
        <GridItem colSpan={1} />
        <GridItem colSpan={3}>
          <AnimatePresence>
            {Array.from({ length: 6 }).map((_, i) => (
              <GridItem colSpan={1} key={i}>
                <Card />
              </GridItem>
            ))}
          </AnimatePresence>
        </GridItem>
      </Grid>
    </>
  );
}

export default Cards;
