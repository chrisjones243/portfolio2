"use client";
import { Flex, Text, Icon, useMediaQuery, Box, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useRef, forwardRef, useEffect } from "react";
import { useDimensions } from "../../dimensions";
import { useColorMode } from "../color-mode";
import ShaderCanvas from "../components/shaderCanvas";
import { BsCursor } from "react-icons/bs";

const langs = [
  "Javascript",
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "Haskell",
  "SQL",
  "TypeScript",
  "C",
  "Visual Basic",
];
const langsColor = [
  "red.300",
  "yellow.300",
  "red.500",
  "blue.500",
  "orange.500",
  "green.500",
  "purple.500",
  "cyan.500",
  "teal.500",
  "pink.500",
  "gray.500",
];

const Experience = forwardRef(function Experience({ experience }, ref) {
  const { height } = useDimensions();
  const { colorMode } = useColorMode();

  const [isLessThan1050] = useMediaQuery("(max-width: 1050px)");

  const [currentLang, setCurrentLang] = useState(0);

  // Use a ref to throttle the mouse move event handling
  const throttleTimeout = useRef(null);

  useEffect(() => {
    let interval;
    if (isLessThan1050) {
      interval = setInterval(() => {
        setCurrentLang(Math.floor(Math.random() * langs.length));
      }, 250); // Adjust the interval time as needed
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLessThan1050]);

  const handleMouseMove = () => {
    if (
      !throttleTimeout.current ||
      throttleTimeout.current === null ||
      throttleTimeout.current === undefined ||
      throttleTimeout.current < 0
    ) {
      throttleTimeout.current = setTimeout(() => {
        setCurrentLang(Math.floor(Math.random() * langs.length));
        throttleTimeout.current = null;
      }, 150); // Adjust the throttle time as needed
    }
  };

  return (
    <Flex
      ref={ref}
      scrollMarginTop={`calc(${height}vh + 2.5rem)`}
      direction="column"
      bg="bg"
      borderRadius="2xl"
      overflow="hidden"
      position="relative"
    >
      <ShaderCanvas isDark={colorMode === "dark"} alpha={0.38} viewportAlign />
      <Box position="relative" zIndex={1} display="flex" flexDirection="column">
      {/* Job timeline — add entries via Sanity Studio */}
      {experience?.length > 0 && (
        <Flex direction="column" px={[6, 10]} py={10} gap={8}>
          <Text
            fontSize={["2xl", "3xl"]}
            fontWeight="800"
            letterSpacing={2}
          >
            Work Experience
          </Text>
          {experience.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
            <Flex gap={6} direction={["column", "row"]}>
              <Text
                fontSize="sm"
                color="gray.500"
                minW="7rem"
                pt={1}
                flexShrink={0}
              >
                {new Date(job.startDate).getFullYear()}
                {" – "}
                {job.isCurrent
                  ? "Present"
                  : new Date(job.endDate).getFullYear()}
              </Text>
              <Box borderLeft="2px" borderColor="stroke" pl={6} flex={1}>
                <Text fontWeight="700" fontSize="lg">
                  {job.jobTitle}
                </Text>
                <Text fontWeight="400" color="gray.500" fontSize="sm">
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </Text>
                {job.description && (
                  <Text mt={2} fontSize="sm" lineHeight="tall">
                    {job.description}
                  </Text>
                )}
                {job.technologies?.length > 0 && (
                  <Flex gap={2} mt={3} flexWrap="wrap">
                    {job.technologies.map((tech, j) => (
                      <Badge key={j} variant="outline" fontSize="xs">
                        {tech}
                      </Badge>
                    ))}
                  </Flex>
                )}
              </Box>
            </Flex>
            </motion.div>
          ))}
        </Flex>
      )}

      {/* Skills animation */}
      <Flex
        height={isLessThan1050 ? `${height * 4}vh` : `${height * 6}vh`}
        direction="column"
        mx={10}
        fontSize={["3xl", "3xl", "4xl", "6xl", "6xl", "4.5rem"]}
        letterSpacing={3}
        justifyContent="center"
        onMouseMove={handleMouseMove}
        onClick={handleMouseMove}
      >
        <Flex>
          <Text fontStyle="italic" fontWeight="600">
            Incredible
          </Text>
          <Text fontWeight="200">&nbsp;at</Text>
        </Flex>
        <Text
          fontWeight="800"
          color={langsColor[currentLang]}
          lineHeight={0.7}
        >
          {langs[currentLang]}
        </Text>
      </Flex>

      <Flex
        width="full"
        height={`${height}vh`}
        bg="bgInverse"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Icon
          as={BsCursor}
          color="fgInverse"
          m={10}
          height={6}
          width={6}
        />
      </Flex>
      </Box>
    </Flex>
  );
});

export default Experience;
