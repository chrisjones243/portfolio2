"use client";
import { Grid, GridItem, useTheme } from "@chakra-ui/react";

import Card from "./card";
import { AnimatePresence } from "framer-motion";

function Cards() {
  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem
          colSpan={1}
          borderTop={`1px solid ${useTheme().colors.stroke}`}
          borderRight={`1px solid ${useTheme().colors.stroke}`}
        />
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
