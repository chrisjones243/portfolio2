"use client";
import React, { useEffect, useState } from "react";
import { Flex, Grid, Text, useTheme } from "@chakra-ui/react";
import Element from "./element";
import { Button } from "../button";

function TicTacToeGame() {
  let board = Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));

  let player = "X";
  let winner = null;
  let isDraw = false;

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
    if (boardState[i][j] === null && !winnerState && !isDrawState) {
      let newBoard = boardState;
      newBoard[i][j] = playerState;
      setBoardState(newBoard);
      checkWinner();
      setPlayerState(playerState === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoardState(board);
    setPlayerState(player);
    setWinnerState(winner);
    setIsDrawState(isDraw);
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
          // isDisbled={winnerState || isDrawState}
        >
          🧑‍🤝‍🧑
        </Button>
        <Button
          border={"1px solid"}
          borderColor={"stroke"}
          height={12}
          justifyContent={"center"}
          // isDisbled={winnerState || isDrawState}
        >
          🤖
        </Button>
        <Button
          border={"1px solid"}
          borderColor={"stroke"}
          height={12}
          justifyContent={"center"}
          // isDisbled={winnerState || isDrawState}
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
