"use client";
import React, { useEffect, useState } from "react";
import { Flex, Grid, Text, useColorMode } from "@chakra-ui/react";
import Element from "./element";
import { Button } from "../button";
import { set } from "sanity";

function TicTacToeGame() {
  const { colorMode } = useColorMode();
  const oppositeColour = colorMode === "light" ? "dark" : "light";

  let board = Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));

  let player = "X";
  let winner = null;
  let isDraw = false;

  const [gameMode, setGameMode] = useState("🧑‍🤝‍🧑");

  const [boardState, setBoardState] = useState(board);
  const [playerState, setPlayerState] = useState(player);
  const [winnerState, setWinnerState] = useState(winner);
  const [isDrawState, setIsDrawState] = useState(isDraw);

  const checkWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        boardState[i][0] !== null &&
        boardState[i][0] === boardState[i][1] &&
        boardState[i][0] === boardState[i][2]
      ) {
        setWinnerState(boardState[i][0]);
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        boardState[0][i] !== null &&
        boardState[0][i] === boardState[1][i] &&
        boardState[0][i] === boardState[2][i]
      ) {
        setWinnerState(boardState[0][i]);
        return;
      }
    }

    // Check diagonals
    if (
      boardState[0][0] !== null &&
      boardState[0][0] === boardState[1][1] &&
      boardState[0][0] === boardState[2][2]
    ) {
      setWinnerState(boardState[0][0]);
      return;
    }

    if (
      boardState[0][2] !== null &&
      boardState[0][2] === boardState[1][1] &&
      boardState[0][2] === boardState[2][0]
    ) {
      setWinnerState(boardState[0][2]);
      return;
    }

    // Check draw
    let draw = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (boardState[i][j] === null) {
          draw = false;
        }
      }
    }
    if (draw) {
      setIsDrawState(true);
    }
  };

  const handleClick = (i, j) => {
    const currentPlayer = playerState;
    if (boardState[i][j] === null && !winnerState && !isDrawState) {
      let newBoard = [...boardState];
      newBoard[i][j] = currentPlayer;
      setBoardState(newBoard);
      checkWinner();
      setPlayerState(currentPlayer === "X" ? "O" : "X");
      if (gameMode === "🎲" && !winnerState && !isDrawState) {
        let available = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (newBoard[i][j] === null) {
              available.push({ i, j });
            }
          }
        }
        if (available.length > 0) {
          let move = available[Math.floor(Math.random() * available.length)];
          newBoard[move.i][move.j] = currentPlayer === "X" ? "O" : "X";
          setBoardState(newBoard);
          checkWinner();
          setPlayerState(currentPlayer === "X" ? "X" : "O");
        }
      } else if (gameMode === "🤯" && !winnerState && !isDrawState) {
        // Add your logic for the 🤯 game mode here
      } else {
        setPlayerState(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  const resetGame = () => {
    setBoardState(board);
    setPlayerState(player);
    setWinnerState(winner);
    setIsDrawState(isDraw);
  };

  const changeMode = (mode = "🧑‍🤝‍🧑") => {
    setGameMode(mode);
    resetGame();
  };

  return (
    <Flex
      direction="column"
      w="full"
      h="full"
      p={5}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex direction="row" justifyContent="center" alignItems="center" gap={5}>
        <Button
          border={"1px solid"}
          borderColor={"stroke"}
          height={12}
          justifyContent={"center"}
          onClick={() => changeMode("🧑‍🤝‍🧑")}
          bg={
            gameMode === "🧑‍🤝‍🧑" ? `background.${oppositeColour}` : "transparent"
          }
        >
          🧑‍🤝‍🧑
        </Button>
        <Button
          border={"1px solid"}
          borderColor={"stroke"}
          height={12}
          justifyContent={"center"}
          onClick={() => changeMode("🎲")}
          bg={
            gameMode === "🎲" ? `background.${oppositeColour}` : "transparent"
          }
        >
          🎲
        </Button>
        <Button
          border={"1px solid"}
          borderColor={"stroke"}
          height={12}
          justifyContent={"center"}
          onClick={() => changeMode("🤯")}
          bg={
            gameMode === "🤯" ? `background.${oppositeColour}` : "transparent"
          }
        >
          🤯
        </Button>
      </Flex>

      <Grid templateColumns="repeat(3, 1fr)" gap={2} mt={5}>
        {boardState.map((row, i) =>
          row.map((cell, j) => (
            <Button
              key={i * 3 + j}
              onClick={() => handleClick(i, j)}
              h={20}
              fontSize={["md", "lg", "xl", "2xl"]}
              fontWeight={"500"}
              border={"1px solid"}
              borderColor={"stroke"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {" "}
              {cell}{" "}
            </Button>
          ))
        )}
      </Grid>
      <Text fontSize={["md", "lg", "xl", "2xl"]} fontWeight={"500"} mt={5}>
        {winnerState
          ? `Winner: ${winnerState}`
          : isDrawState
            ? "It's a draw!"
            : `Next player: ${playerState}`}
      </Text>
      {(winnerState || isDrawState) && (
        <Button
          onClick={resetGame}
          border={"1px solid"}
          borderColor={"stroke"}
          height={12}
          justifyContent={"center"}
          mt={5}
        >
          Play again
        </Button>
      )}
    </Flex>
  );
}

export default TicTacToeGame;
