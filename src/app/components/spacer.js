"use client";
import { useDimensions } from "../../dimensions";
import { Box } from "@chakra-ui/react";

function Spacer() {
  const { height } = useDimensions();
  return <Box height={`${height}vh`} />;
}

export default Spacer;
