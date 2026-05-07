"use client";
import { Box, Text, Flex } from "@chakra-ui/react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDimensions } from "../../dimensions";

function CaseStudiesTitle() {
  const { height } = useDimensions();
  const { scrollY } = useScroll();
  const x = useMotionValue(0);
  const [segmentWidth, setSegmentWidth] = useState(0);
  const firstSegmentRef = useRef(null);
  const prevScrollY = useRef(0);
  const scrollBoost = useRef(0);

  useEffect(() => {
    if (!firstSegmentRef.current) return;

    const measure = () => {
      if (!firstSegmentRef.current) return;
      setSegmentWidth(firstSegmentRef.current.getBoundingClientRect().width);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(firstSegmentRef.current);

    window.addEventListener("resize", measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = Math.abs(latest - prevScrollY.current);
    prevScrollY.current = latest;
    scrollBoost.current = Math.min(scrollBoost.current + delta * 0.06, 8);
  });

  useAnimationFrame((_, delta) => {
    if (segmentWidth <= 0) return;

    scrollBoost.current *= 0.9;

    // Always drift left, then temporarily speed up while scrolling.
    const pxPerFrame = 0.45 + scrollBoost.current;
    let nextX = x.get() - pxPerFrame * (delta / 16.67);

    if (nextX <= -segmentWidth) {
      nextX += segmentWidth;
    }

    x.set(nextX);
  });

  const sequence = [
    { label: "Case Studies", weight: "400" },
    { label: "Case Studies", weight: "900" },
    { label: "Selected Work", weight: "400" },
    { label: "Case Studies", weight: "900" },
    { label: "Case Studies", weight: "400" },
  ];

  const segment = (
    <Flex flexDirection="row" align="center" minW="max-content">
      {sequence.map((item, i) => (
        <Flex key={`${item.label}-${item.weight}-${i}`} align="center">
          <Text fontWeight={item.weight} px={2}>
            {item.label}
          </Text>
          <Text px={2}>✦</Text>
        </Flex>
      ))}
    </Flex>
  );

  return (
    <Box overflow="hidden" h={`${height}vh`} display="flex" alignItems="center">
      <Flex
        as={motion.div}
        style={{ x }}
        whiteSpace="nowrap"
        fontSize={["md", "lg", "2xl", "4xl"]}
        h={`${height}vh`}
        align="center"
        minWidth="max-content"
        willChange="transform"
      >
        <Flex ref={firstSegmentRef}>{segment}</Flex>
        {segment}
      </Flex>
    </Box>
  );
}

export default CaseStudiesTitle;
