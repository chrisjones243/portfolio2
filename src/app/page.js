"use client";
import { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import Layout from "./components/layout";

import Hero from "./sections/hero";
import CaseStudies from "./sections/caseStudies";
import Experience from "./sections/experience";
import Games from "./sections/Games";
import Contact from "./sections/contact";

import Spacer from "./components/spacer";

import Loading from "./loading";

function HomePage() {
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  const HeroRef = useRef(null);
  const CaseStudiesRef = useRef(null);
  const ExperienceRef = useRef(null);
  const GamesRef = useRef(null);
  const ContactRef = useRef(null);

  // Done this way to prevent layout shift
  const [isAScreen] = useMediaQuery("(min-width: 0px)");

  useEffect(() => {
    setTimeout(() => {
      setIsLayoutReady(isAScreen);
    }, 1000);
  }, [isAScreen]);

  if (!isLayoutReady) {
    return <Loading />;
  }

  return (
    <Layout
      refs={{ HeroRef, CaseStudiesRef, ExperienceRef, GamesRef, ContactRef }}
    >
      <Hero ref={HeroRef} />
      <Spacer />
      <Spacer />
      <CaseStudies ref={CaseStudiesRef} />
      <Spacer />
      <Spacer />
      <Experience ref={ExperienceRef} />
      <Spacer />
      <Spacer />
      <Games ref={GamesRef} />
      <Spacer />
      <Spacer />
      <Spacer />
      <Spacer />

      <Contact ref={ContactRef} />
    </Layout>
  );
}

export default HomePage;
