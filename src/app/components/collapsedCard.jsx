"use client";
import { Text, Flex, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDimensions } from "../../dimensions";
import { TAG_COLORS } from "./tagColors";

function CollapsedCard({ data, ...props }) {
  const { height } = useDimensions();
  const { title, slug, tags } = data;

  return (
    <Link
      href={slug ? `/case-studies/${slug}` : "#"}
      style={{ textDecoration: "none", display: "block", width: "100%" }}
    >
      <Flex
        role="group"
        as={motion.div}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        whileTap={{ opacity: 0.7 }}
        cursor="pointer"
        height={`${height}vh`}
        width="100%"
        borderTopWidth="1px"
        borderTopColor="stroke"
        alignItems="center"
        justifyContent="space-between"
        px={[5, 7, 10]}
        transition="background 0.2s"
        _hover={{ bg: "bgInverse", color: "fgInverse" }}
        {...props}
      >
        <Text fontWeight={700} fontSize={["sm", "lg", "2xl"]}>
          {title}
        </Text>
        {tags?.length > 0 && (
          <Flex gap={3} alignItems="center" display={["none", "none", "flex"]}>
            {tags.map((tag) => (
              <Flex key={tag} alignItems="center" gap={1.5} opacity={0.7}>
                <Box
                  w="7px"
                  h="7px"
                  borderRadius="full"
                  flexShrink={0}
                  style={{ backgroundColor: TAG_COLORS[tag] ?? "#888888" }}
                />
                <Text fontSize="xs" fontWeight={500} letterSpacing={0.5}>
                  {tag}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </Link>
  );
}

export default CollapsedCard;
