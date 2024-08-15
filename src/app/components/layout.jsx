"use client";
import { Heading, Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { useDimensions } from "../../dimensions";

import BackgroundLines from "./backgroundLines";
import NavBar from "./navBar";
import Contents from "./contents";

function Layout({ children, scrollTo, refs }) {
  const width = "calc(100% - 5)";
  const { height } = useDimensions();

  return (
    <Box mx={[5, 10, 20]} py={["3", "5", "10"]} width={width}>
      <Grid templateColumns="repeat(5, 1fr)}">
        <GridItem colSpan={4}>
          <NavBar />
          <Box height={`${height}vh`} />
          <Box>{children}</Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Contents scrollTo={scrollTo} refs={refs} />
        </GridItem>
      </Grid>
      <BackgroundLines />
    </Box>
  );
}

export default Layout;
