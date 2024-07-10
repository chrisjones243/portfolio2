import { Box, Text } from "@chakra-ui/react";

function Contents() {
  const width = "calc(100% - 5)";
  return (
    <Box position="fixed" zIndex={10} pl={10} top={["3", "5", "10"]}>
      <Text fontSize="large" fontWeight="bold" mb={6}>
        Contents
      </Text>
      <Text fontSize="md" fontWeight="bold">
        Hero
      </Text>
      <Text fontSize="md">Case studies</Text>
      <Text fontSize="md">Selling point</Text>
      <Text fontSize="md">Mini Games</Text>
      <Text fontSize="md">Contact</Text>
    </Box>
  );
}

export default Contents;
