"use client";
import { Heading, Box, Grid, GridItem, Text, Button } from "@chakra-ui/react";
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

      <Text
        fontSize="sm"
        textAlign="center"
        width={"100%"}
        pb={2}
        position={"absolute"}
        bottom={0}
        left={0}
        color={"grey"}
      >
        {" "}
        This site is protected by reCAPTCHA,{" "}
        <Button
          fontSize="sm"
          variant="link"
          href="https://policies.google.com/privacy"
        >
          Privacy Policy
        </Button>{" "}
        and {""}
        <Button
          fontSize="sm"
          variant="link"
          href="https://policies.google.com/terms"
        >
          {" "}
          Terms of Service
        </Button>{" "}
        apply.
      </Text>
    </Box>
  );
}

export default Layout;
