"use client";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function CaseStudiesTitle() {
  const { colorMode } = useColorMode();

  const firstLine = useRef(null);
  const secondLine = useRef(null);
  const slider = useRef(null);

  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.25,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-=360px",
    });
  }, []);

  const animation = () => {
    if (xPercent < -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstLine.current, { xPercent: xPercent });
    gsap.set(secondLine.current, { xPercent: xPercent });
    xPercent += 0.02 * direction;
    requestAnimationFrame(animation);
  };
  return (
    <Box
      border={`1px solid ${useTheme().colors.stroke}`}
      bg={`background.${colorMode}`}
      overflow={"hidden"}
    >
      <Flex
        position={"relative"}
        whiteSpace={"nowrap"}
        fontSize={["md", "lg", "2xl", "4xl"]}
        ref={slider}
      >
        <Flex flexDirection={"row"} ref={firstLine}>
          <Text fontWeight={"400"}>Case Studies ☬</Text>
          <Text fontWeight={"1000"}>&nbsp;Case Studies&nbsp;</Text>
          <Text fontWeight={"400"}>☬ Case Studies ☬</Text>
          <Text fontWeight={"1000"}>&nbsp;Case Studies&nbsp;</Text>
          <Text fontWeight={"400"}>☬ Case Studies ☬</Text>
        </Flex>
        <Flex
          position={"absolute"}
          left="102%"
          flexDirection={"row"}
          ref={secondLine}
        >
          <Text fontWeight={"400"}>Case Studies ☬</Text>
          <Text fontWeight={"1000"}>&nbsp;Case Studies&nbsp;</Text>
          <Text fontWeight={"400"}>☬ Case Studies ☬</Text>
          <Text fontWeight={"1000"}>&nbsp;Case Studies&nbsp;</Text>
          <Text fontWeight={"400"}>☬ Case Studies ☬</Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CaseStudiesTitle;
