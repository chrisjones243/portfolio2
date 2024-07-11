import { Heading, Box, Text, Flex } from "@chakra-ui/react";

import Layout from "./components/layout";

import Hero from "./sections/hero";
import CaseStudies from "./sections/caseStudies";
import Experience from "./sections/experience";

function HomePage() {
  return (
    <Layout>
      <Hero />
      <CaseStudies />
      <Experience />
    </Layout>
  );
}

export default HomePage;
