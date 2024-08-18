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
      } else if (gameMode === "🤖" && !winnerState && !isDrawState) {
        let bestMove = findBestMove(
          newBoard,
          currentPlayer === "X" ? "O" : "X"
        );
        if (bestMove) {
          newBoard[bestMove.i][bestMove.j] = currentPlayer === "X" ? "O" : "X";
          setBoardState(newBoard);
          checkWinner();
          setPlayerState(currentPlayer === "X" ? "X" : "O");
        }
      } else {
        setPlayerState(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  // Minimax algorithm implementation
  const findBestMove = (board, player) => {
    let bestScore = player === "X" ? -Infinity : Infinity;
    let bestMove = null;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          board[i][j] = player;
          let score = minimax(board, 0, false, player === "X" ? "O" : "X");
          board[i][j] = null;
          if (
            (player === "X" && score > bestScore) ||
            (player === "O" && score < bestScore)
          ) {
            bestScore = score;
            bestMove = { i, j };
          }
        }
      }
    }
    return bestMove;
  };

  const minimax = (board, depth, isMaximizing, player) => {
    let scores = { X: 10, O: -10, tie: 0 };
    let result = checkWinnerForMinimax(board);
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = player;
            let score = minimax(
              board,
              depth + 1,
              false,
              player === "X" ? "O" : "X"
            );
            board[i][j] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = player;
            let score = minimax(
              board,
              depth + 1,
              true,
              player === "X" ? "O" : "X"
            );
            board[i][j] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  };

  const checkWinnerForMinimax = (board) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] !== null &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        return board[i][0];
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] !== null &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        return board[0][i];
      }
    }

    // Check diagonals
    if (
      board[0][0] !== null &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] !== null &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      return board[0][2];
    }

    // Check draw
    let draw = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          draw = false;
        }
      }
    }
    if (draw) {
      return "tie";
    }

    return null;
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
          onClick={() => changeMode("🤖")}
          bg={
            gameMode === "🤖" ? `background.${oppositeColour}` : "transparent"
          }
        >
          🤖
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
