"use client";
import { useState, useRef } from "react";
import { Box, Text, Flex, Textarea, Grid, GridItem } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MAX_CHARS = 500;

export default function TranslatorUI() {
  const [input, setInput]         = useState("");
  const [output, setOutput]       = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [method, setMethod]       = useState("beam");
  const abortRef                  = useRef(null);

  async function handleTranslate() {
    const text = input.trim();
    if (!text || loading) return;

    setLoading(true);
    setError("");
    setOutput("");

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, method }),
        signal: abortRef.current.signal,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Translation failed");
      setOutput(data.translation);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleTranslate();
    }
  }

  const charsLeft = MAX_CHARS - input.length;
  const overLimit = charsLeft < 0;

  return (
    <Grid
      templateColumns={["1fr", "1fr", "1fr 1fr"]}
      borderRadius="2xl"
      overflow="hidden"
      bg="bgInverse"
      minH="320px"
    >
      {/* ── Input panel ── */}
      <GridItem
        display="flex"
        flexDirection="column"
        borderRightWidth={["0", "0", "1px"]}
        borderBottomWidth={["1px", "1px", "0"]}
        borderColor="stroke"
        p={6}
        gap={3}
      >
        <Flex justify="space-between" align="center">
          <Text fontSize="xs" fontWeight="600" letterSpacing={3} textTransform="uppercase" color="fgInverse" opacity={0.5}>
            English
          </Text>
          {/* Decode method toggle */}
          <Flex gap={2}>
            {["beam", "greedy"].map((m) => (
              <Box
                key={m}
                as="button"
                onClick={() => setMethod(m)}
                px={3}
                py={1}
                borderRadius="full"
                fontSize="2xs"
                fontWeight="600"
                letterSpacing={2}
                textTransform="uppercase"
                bg={method === m ? "fg" : "transparent"}
                color={method === m ? "bg" : "fgInverse"}
                opacity={method === m ? 1 : 0.5}
                borderWidth="1px"
                borderColor="stroke"
                transition="all 0.2s"
                _hover={{ opacity: 1 }}
              >
                {m}
              </Box>
            ))}
          </Flex>
        </Flex>

        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS + 10))}
          onKeyDown={handleKeyDown}
          placeholder="Type English text here…"
          resize="none"
          flex={1}
          minH="180px"
          bg="transparent"
          border="none"
          outline="none"
          _focusVisible={{ boxShadow: "none", border: "none" }}
          color="fgInverse"
          fontSize={["sm", "md"]}
          fontWeight="400"
          p={0}
          _placeholder={{ opacity: 0.3, color: "fgInverse" }}
        />

        <Flex justify="space-between" align="center">
          <Text fontSize="2xs" color="fgInverse" opacity={overLimit ? 1 : 0.3} fontWeight={overLimit ? "700" : "400"}>
            {overLimit ? `${Math.abs(charsLeft)} over limit` : `${charsLeft} remaining`}
          </Text>
          <Box
            as="button"
            onClick={handleTranslate}
            disabled={loading || overLimit || !input.trim()}
            px={5}
            py={2}
            borderRadius="full"
            bg={loading || overLimit || !input.trim() ? "transparent" : "fg"}
            color={loading || overLimit || !input.trim() ? "fgInverse" : "bgInverse"}
            fontSize="xs"
            fontWeight="700"
            letterSpacing={2}
            textTransform="uppercase"
            borderWidth="1px"
            borderColor="stroke"
            opacity={loading || overLimit || !input.trim() ? 0.4 : 1}
            transition="all 0.2s"
            _hover={{ opacity: loading || overLimit || !input.trim() ? 0.4 : 0.85 }}
            cursor={loading || overLimit || !input.trim() ? "not-allowed" : "none"}
          >
            {loading ? "Translating…" : "Translate ⌘↵"}
          </Box>
        </Flex>
      </GridItem>

      {/* ── Output panel ── */}
      <GridItem
        display="flex"
        flexDirection="column"
        p={6}
        gap={3}
      >
        <Text fontSize="xs" fontWeight="600" letterSpacing={3} textTransform="uppercase" color="fgInverse" opacity={0.5}>
          French
        </Text>

        <Box flex={1} minH="180px" position="relative">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: "flex", gap: "8px", alignItems: "center", paddingTop: "4px" }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", opacity: 0.5 }}
                  />
                ))}
              </motion.div>
            )}

            {!loading && error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Text color="red.400" fontSize="sm">{error}</Text>
              </motion.div>
            )}

            {!loading && !error && output && (
              <motion.div
                key="output"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Text color="fgInverse" fontSize={["sm", "md"]} fontWeight="400" whiteSpace="pre-wrap">
                  {output}
                </Text>
              </motion.div>
            )}

            {!loading && !error && !output && (
              <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Text color="fgInverse" opacity={0.2} fontSize={["sm", "md"]}>
                  Translation will appear here
                </Text>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        <Text fontSize="2xs" color="fgInverse" opacity={0.2} mt="auto">
          Encoder-decoder transformer · BPE tokeniser · beam search (width 5)
        </Text>
      </GridItem>
    </Grid>
  );
}
