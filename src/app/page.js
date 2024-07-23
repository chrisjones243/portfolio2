"use client";
import { useRef } from "react";
import Layout from "./components/layout";

import Hero from "./sections/hero";
import CaseStudies from "./sections/caseStudies";
import Experience from "./sections/experience";
import Games from "./sections/Games";
import Contact from "./sections/contact";

import Spacer from "./components/spacer";

function HomePage() {
  const HeroRef = useRef(null);
  const CaseStudiesRef = useRef(null);
  const ExperienceRef = useRef(null);
  const GamesRef = useRef(null);
  const ContactRef = useRef(null);

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
