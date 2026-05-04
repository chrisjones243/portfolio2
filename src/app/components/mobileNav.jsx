"use client";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useColorMode } from "../color-mode";
import { BsMoon, BsSun } from "react-icons/bs";
import {
  BsPerson,
  BsBriefcase,
  BsEnvelope,
  BsGrid,
  BsController,
} from "react-icons/bs";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(() => {
    if (typeof IntersectionObserver !== "undefined") {
      return new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        { threshold: 0.2 }
      );
    }
    return { observe: () => {}, disconnect: () => {} };
  }, []);

  useEffect(() => {
    if (ref?.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [observer, ref]);

  return isIntersecting;
}

const scrollTo = (ref) => {
  ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function MobileNav({ refs }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isHero = useOnScreen(refs.HeroRef);
  const isCaseStudies = useOnScreen(refs.CaseStudiesRef);
  const isExperience = useOnScreen(refs.ExperienceRef);
  const isContact = useOnScreen(refs.ContactRef);

  const bgColor =
    colorMode === "dark"
      ? "rgba(17, 17, 17, 0.85)"
      : "rgba(222, 221, 205, 0.85)";
  const ring =
    colorMode === "dark"
      ? "0 -1px 0 rgba(255,255,255,0.08)"
      : "0 -1px 0 rgba(0,0,0,0.08)";

  const NAV = [
    { label: "Hero", icon: BsPerson, active: isHero, ref: refs.HeroRef },
    {
      label: "Work",
      icon: BsBriefcase,
      active: isCaseStudies,
      ref: refs.CaseStudiesRef,
    },
    {
      label: "Skills",
      icon: BsGrid,
      active: isExperience,
      ref: refs.ExperienceRef,
    },
    {
      label: "Contact",
      icon: BsEnvelope,
      active: isContact,
      ref: refs.ContactRef,
    },
  ];

  return (
    <Flex
      as={motion.div}
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={20}
      bg={bgColor}
      style={{
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: ring,
      }}
      px={2}
      pb="env(safe-area-inset-bottom, 0px)"
      alignItems="stretch"
    >
      {NAV.map(({ label, icon, active, ref }) => (
        <Flex
          key={label}
          flex={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap={0.5}
          py={3}
          cursor="pointer"
          onClick={() => scrollTo(ref)}
          color={active ? "fg" : "gray.500"}
          transition="color 0.2s"
          _hover={{ color: "fg" }}
        >
          <Icon as={icon} w={5} h={5} />
          <Text fontSize="9px" fontWeight={active ? "700" : "400"} letterSpacing="wider" textTransform="uppercase">
            {label}
          </Text>
        </Flex>
      ))}

      {/* Theme toggle */}
      <Flex
        flex={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={0.5}
        py={3}
        cursor="pointer"
        onClick={toggleColorMode}
        color="gray.500"
        transition="color 0.2s"
        _hover={{ color: "fg" }}
      >
        <Icon as={colorMode === "dark" ? BsSun : BsMoon} w={5} h={5} />
        <Text fontSize="9px" fontWeight="400" letterSpacing="wider" textTransform="uppercase">
          Theme
        </Text>
      </Flex>

      {/* Games easter egg */}
      <Flex
        as={Link}
        href="/games"
        flex={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={0.5}
        py={3}
        color="gray.500"
        transition="color 0.2s"
        _hover={{ color: "fg" }}
      >
        <Icon as={BsController} w={5} h={5} />
        <Text fontSize="9px" fontWeight="400" letterSpacing="wider" textTransform="uppercase">
          Games
        </Text>
      </Flex>
    </Flex>
  );
}
