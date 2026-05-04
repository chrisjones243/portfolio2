"use client";
import React, { useState, useRef, useEffect } from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Button } from "../button";

const EMPTY_BOARD = () => Array(3).fill(null).map(() => Array(3).fill(null));

// Returns "X", "O", "tie", or null — works on any board snapshot
function getBoardResult(board) {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) return board[i][0];
    if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) return board[0][i];
  }
  if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) return board[0][0];
  if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) return board[0][2];
  if (board.every(row => row.every(cell => cell !== null))) return "tie";
  return null;
}

function minimax(board, depth, isMaximizing) {
  const result = getBoardResult(board);
  if (result === "X") return 10 - depth;
  if (result === "O") return depth - 10;
  if (result === "tie") return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        board[i][j] = "X";
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i][j] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        board[i][j] = "O";
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i][j] = null;
      }
    }
    return best;
  }
}

function findBestMove(board, aiPlayer) {
  let bestScore = aiPlayer === "X" ? -Infinity : Infinity;
  let bestMove = null;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    if (!board[i][j]) {
      board[i][j] = aiPlayer;
      const score = minimax(board, 0, aiPlayer !== "X");
      board[i][j] = null;
      if (aiPlayer === "X" ? score > bestScore : score < bestScore) {
        bestScore = score;
        bestMove = { i, j };
      }
    }
  }
  return bestMove;
}

function TicTacToeGame() {
  const [gameMode, setGameMode] = useState("�");
  const [boardState, setBoardState] = useState(EMPTY_BOARD());
  const [playerState, setPlayerState] = useState("X");
  const [winnerState, setWinnerState] = useState(null);
  const [isDrawState, setIsDrawState] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const thinkTimeout = useRef(null);

  // Cancel pending AI move on unmount
  useEffect(() => () => clearTimeout(thinkTimeout.current), []);

  const handleClick = (i, j) => {
    if (boardState[i][j] || winnerState || isDrawState || isThinking) return;

    const board = boardState.map(row => [...row]);
    board[i][j] = playerState;
    setBoardState(board);

    const result = getBoardResult(board);
    if (result === "tie") { setIsDrawState(true); return; }
    if (result) { setWinnerState(result); return; }

    const opponent = playerState === "X" ? "O" : "X";

    if (gameMode === "🎲") {
      setIsThinking(true);
      thinkTimeout.current = setTimeout(() => {
        const b2 = board.map(r => [...r]);
        const empty = [];
        for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (!b2[r][c]) empty.push({ i: r, j: c });
        if (empty.length) {
          const move = empty[Math.floor(Math.random() * empty.length)];
          b2[move.i][move.j] = opponent;
          const r2 = getBoardResult(b2);
          setBoardState(b2);
          if (r2 === "tie") setIsDrawState(true);
          else if (r2) setWinnerState(r2);
        }
        setIsThinking(false);
      }, 600);
      return;
    }

    if (gameMode === "🤖") {
      setIsThinking(true);
      thinkTimeout.current = setTimeout(() => {
        const b2 = board.map(r => [...r]);
        const move = findBestMove(b2.map(r => [...r]), opponent);
        if (move) {
          b2[move.i][move.j] = opponent;
          const r2 = getBoardResult(b2);
          setBoardState(b2);
          if (r2 === "tie") setIsDrawState(true);
          else if (r2) setWinnerState(r2);
        }
        setIsThinking(false);
      }, 600);
      return;
    }

    // Two-player
    setPlayerState(opponent);
  };

  const resetGame = () => {
    clearTimeout(thinkTimeout.current);
    setBoardState(EMPTY_BOARD());
    setPlayerState("X");
    setWinnerState(null);
    setIsDrawState(false);
    setIsThinking(false);
  };

  const changeMode = (mode) => {
    clearTimeout(thinkTimeout.current);
    setGameMode(mode);
    setBoardState(EMPTY_BOARD());
    setPlayerState("X");
    setWinnerState(null);
    setIsDrawState(false);
    setIsThinking(false);
  };

  const statusText = winnerState
    ? `${winnerState} wins`
    : isDrawState
    ? "It's a draw"
    : isThinking
    ? "Thinking…"
    : `${playerState} to play`;

  const MODES = [
    { id: "🤖", label: "vs AI", sub: "Unbeatable" },
    { id: "🎲", label: "vs Random", sub: "Easy" },
    { id: "🧑‍🤝‍🧑", label: "2 Players", sub: "Local" },
  ];

  return (
    <Flex direction="row" w="full" h="full" gap={0} pt={4} alignItems="stretch">
      {/* Mode selector — vertical list */}
      <Flex direction="column" gap={1} pr={5} justifyContent="center" minW="110px">
        {MODES.map(({ id, label, sub }) => {
          const active = gameMode === id;
          return (
            <Flex
              key={id}
              direction="row"
              alignItems="center"
              gap={2}
              px={3}
              py={2}
              borderRadius="lg"
              cursor="pointer"
              onClick={() => changeMode(id)}
              bg={active ? "bgInverse" : "transparent"}
              color={active ? "fgInverse" : "fg"}
              opacity={active ? 1 : 0.5}
              _hover={{ opacity: 1, bg: active ? "bgInverse" : "whiteAlpha.100" }}
              transition="all 0.15s"
            >
              <Flex direction="column">
                <Text fontSize="xs" fontWeight="700" lineHeight="1.2">{label}</Text>
                <Text fontSize="10px" opacity={0.6} lineHeight="1.2">{sub}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>

      {/* Board + status */}
      <Flex direction="column" flex={1} alignItems="center" justifyContent="center" gap={4}>
        <Grid templateColumns="repeat(3, 1fr)" w="full">
          {boardState.map((row, i) =>
            row.map((cell, j) => (
              <Box
                key={i * 3 + j}
                as="button"
                onClick={() => handleClick(i, j)}
                aspectRatio="1"
                w="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderWidth="1px"
                borderColor="stroke"
                bg={cell === "X" ? "transparent" : cell === "O" ? "transparent" : "transparent"}
                color={cell === "X" ? "blue.400" : cell === "O" ? "red.400" : "fg"}
                fontSize={["2xl", "3xl", "4xl"]}
                fontWeight="800"
                cursor={cell || winnerState || isDrawState || isThinking ? "default" : "pointer"}
                opacity={isThinking && !cell ? 0.4 : 1}
                transition="all 0.15s"
                _hover={
                  !cell && !winnerState && !isDrawState && !isThinking
                    ? { bg: "whiteAlpha.50" }
                    : {}
                }
              >
                {cell}
              </Box>
            ))
          )}
        </Grid>

        {/* Status */}
        <Text
          fontStyle="italic"
          fontWeight="600"
          opacity={isThinking ? 0.5 : 0.8}
          transition="opacity 0.3s"
          letterSpacing="wide"
          textTransform="uppercase"
          fontSize="xs"
        >
          {statusText}
        </Text>

        {/* Play again */}
        {(winnerState || isDrawState) && (
          <Button
            onClick={resetGame}
            borderWidth="1px"
            borderColor="stroke"
            height={10}
            w="auto"
            px={6}
            fontSize="sm"
            justifyContent="center"
          >
            Play again
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default TicTacToeGame;
