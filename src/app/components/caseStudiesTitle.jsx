"use client";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
import { useDimensions } from "../../dimensions";

function CaseStudiesTitle() {
  const { height, blockWidth } = useDimensions();

  const image = "✦";

  const firstLine = useRef(null);
  const secondLine = useRef(null);
  const slider = useRef(null);

  const xPercent = useRef(0);
  const direction = useRef(-1);

  useEffect(() => {
    gsap.set(secondLine.current, {
      left: secondLine.current.getBoundingClientRect().width,
    });

    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.5,
        start: 0,
        onUpdate: (e) => (direction.current = e.direction * -1),
      },

      x: "-200px",
    });

    const animate = () => {
      if (xPercent.current > 0) {
        xPercent.current = -100;
      }

      gsap.set(firstLine.current, { xPercent: xPercent.current });
      gsap.set(secondLine.current, { xPercent: xPercent.current });
      requestAnimationFrame(animate);

      xPercent.current += 0.02;
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <Box
      // border={`1px solid ${useTheme().colors.stroke}`}
      // bg={`background.${colorMode}`}
      overflow={"hidden"}
      h={`${height}vh`}
    >
      <Flex
        position={"relative"}
        whiteSpace={"nowrap"}
        fontSize={["md", "lg", "2xl", "4xl"]}
        ref={slider}
        h={`${height}vh`}
        display={"flex"}
        flexDirection={"row"}
        align={"center"}
      >
        <Flex flexDirection={"row"} ref={firstLine}>
          <Text fontWeight={"400"}>&nbsp;Case Studies&nbsp;</Text>
          {image} <Text fontWeight={"1000"}>&nbsp;Case Studies&nbsp;</Text>
          {image} <Text fontWeight={"400"}>&nbsp;Selected Work&nbsp;</Text>
          {image} <Text fontWeight={"1000"}>&nbsp;Case Studies&nbsp;</Text>
          {image} <Text fontWeight={"400"}>&nbsp;Case Studies&nbsp;</Text>
          {image}
        </Flex>

        <Flex
          position={"absolute"}
          left={firstLine?.current?.offsetWidth}
          flexDirection={"row"}
          ref={secondLine}
        >
          <Text fontWeight={"400"}>&nbsp;Case Studies&nbsp;</Text>
          {image} <Text fontWeight={"1000"}>&nbsp;Case Studies&nbsp;</Text>
          {image} <Text fontWeight={"400"}>&nbsp;Selected Work&nbsp;</Text>
          {image} <Text fontWeight={"1000"}>&nbsp;Case Studies&nbsp;</Text>
          {image} <Text fontWeight={"400"}>&nbsp;Case Studies&nbsp;</Text>
          {image}
        </Flex>
      </Flex>
    </Box>
  );
}

export default CaseStudiesTitle;
