import { Heading, Box, Grid, GridItem, Text } from "@chakra-ui/react";

import BackgroundLines from "./backgroundLines";
import NavBar from "./navBar";
import Contents from "./contents";

function Layout({ children }) {
  const width = "calc(100% - 5)";
  console.log("Layout -> width", width);
  return (
    <Box mx={[5, 10, 20]} width={width}>
      <Grid templateColumns="repeat(5, 1fr)}">
        <GridItem colSpan={4}>
          <NavBar />
          <Box height={[90, 100, 120]} />
          <Box>{children}</Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Contents />
        </GridItem>
      </Grid>
      <BackgroundLines />
    </Box>
  );
}

export default Layout;
