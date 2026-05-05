"use client";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function CaseStudyLoading() {
  return (
    <Box mx={[5, 10, 20]} py={["3", "5", "10"]} pb={["20", "10", "10"]} minH="100vh">
      {/* Hero image/video area */}
      <Skeleton borderRadius="2xl" height={["50vh", "60vh", "75vh"]} mb={8} />

      {/* Back link + title */}
      <Skeleton height="1.5rem" width="6rem" mb={6} borderRadius="md" />
      <Skeleton height="3rem" width="70%" mb={3} borderRadius="md" />
      <Skeleton height="1rem" width="40%" mb={8} borderRadius="md" />

      {/* Body content rows */}
      <SkeletonText noOfLines={6} gap={3} mb={6} />
      <SkeletonText noOfLines={4} gap={3} mb={6} />
      <SkeletonText noOfLines={5} gap={3} />
    </Box>
  );
}
