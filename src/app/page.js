import { Heading, Box, Text, Flex } from "@chakra-ui/react";

import Layout from "./components/layout";

import Hero from "./sections/hero";
import CaseStudies from "./sections/caseStudies";
import Experience from "./sections/experience";
import Games from "./sections/Games";

function HomePage() {
  return (
    <Layout>
      <Hero />
      <CaseStudies />
      <Experience />
      <Games />
    </Layout>
  );
}

export default HomePage;
