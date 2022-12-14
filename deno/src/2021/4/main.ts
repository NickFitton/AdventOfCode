import "https://deno.land/x/arrays@v1.0.21/mod.ts";
import { sum } from "../../utils/reducer.ts";

const stringNotEmpty = (input: string) => input.length > 0;
const parseNumber = (numberStr: string): number => parseInt(numberStr);

const loadBoards = (lines: string[]): number[][][] => {
  return (lines.chunk(6) as string[][])
    .map((board) => board.filter(stringNotEmpty))
    .map((board) =>
      board.map((line) =>
        line.split(/ +/).filter(stringNotEmpty).map(parseNumber)
      )
    );
};

const hasBingo = (
  board: number[][],
  calledNumber: number
): { board: number[][]; bingo: boolean } => {
  board = board.map((line) =>
    line.map((lineNumber) => (lineNumber === calledNumber ? -1 : lineNumber))
  );

  const checkRows = (): boolean => {
    for (let i = 0; i < 5; i++) {
      if (
        new Array(5)
          .fill(0)
          .map((_v, y) => board[y][i])
          .every((item) => item === -1)
      ) {
        return true;
      }
    }
    return false;
  };

  return {
    board,
    bingo:
      board.some((line) => line.every((lineNumber) => lineNumber === -1)) ||
      checkRows(),
  };
};

const buildScore = (board: number[][], bingoNumber: number): number =>
  board
    .flatMap((item) => item)
    .filter((item) => item !== -1)
    .reduce(sum) * bingoNumber;

const winningBoardScore = (text: string): number => {
  const lines = text.split("\n");
  const calledNumbers: number[] = lines.shift()!.split(",").map(parseNumber);
  const boards = loadBoards(lines);

  while (calledNumbers.length > 0) {
    const nextNumber = calledNumbers.shift()!;

    for (let i = 0; i < boards.length; i++) {
      const { board, bingo } = hasBingo(boards[i], nextNumber);
      if (bingo) {
        return buildScore(board, nextNumber);
      }
      boards[i] = board;
    }
  }
  return -1;
};

export const part1 = winningBoardScore;

const lastWinningBoardScore = (text: string): number => {
  const lines = text.split("\n");
  const calledNumbers: number[] = lines.shift()!.split(",").map(parseNumber);
  const boards = loadBoards(lines);
  const boardSuccessMap: Record<number, boolean> = {};

  while (calledNumbers.length > 0) {
    const nextNumber = calledNumbers.shift()!;

    for (let i = 0; i < boards.length; i++) {
      if (!boardSuccessMap[i]) {
        const { board, bingo } = hasBingo(boards[i], nextNumber);
        if (bingo) {
          boardSuccessMap[i] = true;
          if (Object.keys(boardSuccessMap).length === boards.length) {
            return buildScore(board, nextNumber);
          }
        }
        boards[i] = board;
      }
    }
  }
  return -1;
};
export const part2 = lastWinningBoardScore;
