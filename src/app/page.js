import { Heading, Box, Text, Flex } from "@chakra-ui/react";

import Layout from "./components/layout";

import Hero from "./sections/hero";
import CaseStudies from "./sections/caseStudies";
import Experience from "./sections/experience";
import Games from "./sections/Games";

import Spacer from "./components/spacer";
import { SP } from "next/dist/shared/lib/utils";

function HomePage() {
  return (
    <Layout>
      <Hero />
      <Spacer />
      <CaseStudies />
      <Spacer />
      <Experience />
      <Spacer />
      <Games />
      <Spacer />
    </Layout>
  );
}

export default HomePage;
