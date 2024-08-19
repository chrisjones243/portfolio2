import { Flex, Spinner, useColorMode } from "@chakra-ui/react";

function Loading() {
  const { colorMode } = useColorMode();
  return (
    <Flex
      position="absolute"
      justify="center"
      align="center"
      width="100vw"
      height="100vh"
      bg={`background.${colorMode}`}
      zIndex={100}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor={`background.${colorMode}`}
        color={`brand.${colorMode}`}
        size="xl"
      />
    </Flex>
  );
}

export default Loading;
