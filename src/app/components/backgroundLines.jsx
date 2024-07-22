import { Flex, Box } from "@chakra-ui/react";

const BackgroundLines = ({ numberOfLines = 6 }) => {
  const lines = Array(numberOfLines)
    .fill()
    .map((_, i) => {
      return <Box key={i} bg={"stroke"} h="full" w="1px" />;
    });

  return (
    <Flex
      position="absolute"
      justify="space-between"
      direction={"column"}
      zIndex={-20}
      py={["3", "5", "10"]}
      px={[5, 10, 20]}
      width="full"
      height="full"
      left={0}
      top={0}
    >
      <Box bg={"stroke"} w="full" h="1px" />
      <Flex direction="row" justify="space-between" height="full">
        {lines}
      </Flex>
      <Box bg={"stroke"} h="1px" />
    </Flex>
  );
};

export default BackgroundLines;
