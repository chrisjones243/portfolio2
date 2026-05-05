"use client";
import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

function Loading() {
  return (
    <Box mx={[5, 10, 20]} py={["3", "5", "10"]} pb={["20", "10", "10"]} minH="100vh">
      {/* Hero skeleton */}
      <Skeleton borderRadius="2xl" height={["40vh", "50vh", "80vh"]} mb={6} />

      {/* Case studies skeleton */}
      <Skeleton borderRadius="2xl" height="3rem" mb={3} />
      {[0, 1, 2].map((i) => (
        <Box key={i} mb={3}>
          <Skeleton borderRadius="2xl" height={["14vh", "14vh", "12vh"]} />
        </Box>
      ))}

      <Box mt={6}>
        {/* Experience skeleton */}
        <Skeleton borderRadius="2xl" height={["50vh", "60vh", "70vh"]} />
      </Box>
    </Box>
  );
}

export default Loading;
