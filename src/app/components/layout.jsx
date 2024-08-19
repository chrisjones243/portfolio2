"use client";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Link,
  useMediaQuery,
} from "@chakra-ui/react";
import { useDimensions } from "../../dimensions";

import BackgroundLines from "./backgroundLines";
import NavBar from "./navBar";
import Contents from "./contents";
import { useEffect } from "react";

function Layout({ children, scrollTo, refs }) {
  const [isLessThan1050] = useMediaQuery("(max-width: 1050px)");
  const width = "calc(100% - 5)";
  const { height, setBlockWidth } = useDimensions();

  useEffect(() => {
    if (isLessThan1050) {
      setBlockWidth(`calc(${100 / 4}% + 1px)`);
    }
  }, [isLessThan1050, setBlockWidth]);

  return (
    <Box
      mx={[5, 10, 20]}
      py={["3", "5", "10"]}
      pb={["20", "10", "10"]}
      width={width}
    >
      <Grid templateColumns="repeat(5, 1fr)}">
        <GridItem colSpan={isLessThan1050 ? 5 : 4}>
          <NavBar />
          <Box height={`${height}vh`} />
          <Box>{children}</Box>
        </GridItem>
        {isLessThan1050 ? null : (
          <GridItem colSpan={1}>
            <Contents scrollTo={scrollTo} refs={refs} />
          </GridItem>
        )}
      </Grid>
      <BackgroundLines numberOfLines={isLessThan1050 ? 5 : 6} />

      <Text
        fontSize={["xs", "xs", "sm"]}
        textAlign="center"
        width={"100%"}
        px={[5, 10, 20]}
        pb={2}
        position={"absolute"}
        bottom={0}
        left={0}
        color={"grey"}
      >
        {" "}
        This site is protected by reCAPTCHA,{" "}
        <Link
          fontSize={["xs", "xs", "sm"]}
          href="https://policies.google.com/privacy"
          // color={"grey"}
          isExternal
        >
          Privacy Policy
        </Link>{" "}
        and {""}
        <Link
          fontSize={["xs", "xs", "sm"]}
          href="https://policies.google.com/terms"
          color={"grey"}
          isExternal
        >
          {" "}
          Terms of Service
        </Link>{" "}
        apply.
      </Text>
    </Box>
  );
}

export default Layout;
