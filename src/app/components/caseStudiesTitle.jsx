"use client";
import { useState } from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

function CaseStudiesTitle() {
  const { colorMode } = useColorMode();

  const symbol =
    colorMode === "light" ? "jedi-order-dark.svg" : "jedi-order-light.svg";
  const symbolSize = 20;

  //   const image = (
  //     <Image src={symbol} alt="Logo" width={symbolSize} height={symbolSize} />
  //   );

  const image = "🌮";

  const [offsetWidth, setOffsetWidth] = useState(0); // Step 1

  const firstLine = useRef(null);
  const secondLine = useRef(null);
  const slider = useRef(null);

  useEffect(() => {
    // Step 3
    const updateWidth = () => {
      if (firstLine.current) {
        setOffsetWidth(firstLine.current.offsetWidth);
      }
    };

    updateWidth(); // Update width initially

    // Optional: Update width on window resize
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [firstLine]); // Dependency array ensures effect runs when `current` changes

  let xPercent = 0;
  let direction = -1;

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
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },

      x: "-200px",
    });

    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent > 0) {
      xPercent = -100;
    }

    gsap.set(firstLine.current, { xPercent: xPercent });
    gsap.set(secondLine.current, { xPercent: xPercent });
    requestAnimationFrame(animate);

    xPercent += 0.02;
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
          <Text fontWeight={"400"}>&nbsp;Case Studies&nbsp;</Text>
          {image} <Text fontWeight={"1000"}>&nbsp;Case Studies&nbsp;</Text>
          {image} <Text fontWeight={"400"}>&nbsp;Case Studies&nbsp;</Text>
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
          {image} <Text fontWeight={"400"}>&nbsp;Case Studies&nbsp;</Text>
          {image} <Text fontWeight={"1000"}>&nbsp;Case Studies&nbsp;</Text>
          {image} <Text fontWeight={"400"}>&nbsp;Case Studies&nbsp;</Text>
          {image}
        </Flex>
      </Flex>
    </Box>
  );
}

export default CaseStudiesTitle;
