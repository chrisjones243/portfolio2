import { Heading, Box, Text, Flex } from "@chakra-ui/react";

import Layout from "./components/layout";

import Hero from "./sections/hero";
import CaseStudies from "./sections/caseStudies";

function HomePage() {
  return (
    <Layout>
      <Hero />
      <CaseStudies />
      <Box height={"100vh"} />
    </Layout>
  );
}

export default HomePage;
