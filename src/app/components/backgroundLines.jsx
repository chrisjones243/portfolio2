import { Flex, Box } from "@chakra-ui/react";

const BackgroundLines = ({ numberOfLines = 6 }) => {
  const line = () => {
    return <Box bg={"stroke"} h="100vh" w="1px" top={0} />;
  };

  const lines = Array(numberOfLines)
    .fill()
    .map((_, i) => {
      return <Box key={i}>{line()}</Box>;
    });

  return (
    <Flex
      justify="space-between"
      width="full"
      left={0}
      px={[5, 10, 20]}
      top={0}
      zIndex={-20}
      position="fixed"
    >
      {lines}
    </Flex>
  );
};

export default BackgroundLines;
