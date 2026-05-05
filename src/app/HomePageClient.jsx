"use client";
import { useRef } from "react";
import Layout from "./components/layout";

import Hero from "./sections/hero";
import CaseStudies from "./sections/caseStudies";
import Experience from "./sections/experience";
import Contact from "./sections/contact";
import Spacer from "./components/spacer";

export default function HomePageClient({
  caseStudies,
  resumeUrl,
  experience,
  availableForWork,
}) {
  const HeroRef = useRef(null);
  const CaseStudiesRef = useRef(null);
  const ExperienceRef = useRef(null);
  const ContactRef = useRef(null);

  return (
    <Layout refs={{ HeroRef, CaseStudiesRef, ExperienceRef, ContactRef }}>
      <Hero ref={HeroRef} availableForWork={availableForWork} />
      <Spacer />
      <Spacer />
      <CaseStudies ref={CaseStudiesRef} caseStudies={caseStudies} />
      <Spacer />
      <Spacer />
      <Experience ref={ExperienceRef} experience={experience} />
      <Spacer />
      <Spacer />
      <Spacer />
      <Spacer />
      <Contact ref={ContactRef} resumeUrl={resumeUrl} />
    </Layout>
  );
}
