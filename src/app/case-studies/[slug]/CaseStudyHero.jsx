"use client";
import { Box, Text } from "@chakra-ui/react";

export default function CaseStudyHero({ title, imageUrl, videoUrl }) {
  return (
    <Box
      position="relative"
      h={["50vh", "60vh", "75vh"]}
      overflow="hidden"
      bg="#111"
      borderRadius="2xl"
    >
      {videoUrl ? (
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
          }}
        />
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : null}

      <Box
        position="absolute"
        inset={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={[4, 6, 10]}
        zIndex={2}
      >
        <Text
          fontStyle="normal"
          fontWeight={900}
          fontSize={["2xl", "3xl", "4xl", "5xl"]}
          color="white"
          lineHeight="1.15"
          textAlign="center"
        >
          {title}
        </Text>
      </Box>
    </Box>
  );
}
