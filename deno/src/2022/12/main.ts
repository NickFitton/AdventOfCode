const HEIGHT_APLHABET = "SabcdefghijklmnopqrstuvwxyzE";

const MOD_MAP = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

const POSSIBLE_HEIGHT_CHANGES = [-1, 0, 1];

type Position = {
  x: number;
  y: number;
};

const parseInput = (
  text: string
): {
  start: Position;
  end: Position;
  heightMap: number[][];
  stepMap: boolean[][];
} => {
  let start: Position = { x: -1, y: -1 };
  let end: Position = { x: -1, y: -1 };

  const heightMap = text.split("\n").map((line, y) =>
    line.split("").map((char, x) => {
      if (char === "S") {
        start = { x, y };
      } else if (char === "E") {
        end = { x, y };
      }
      return HEIGHT_APLHABET.indexOf(char);
    })
  );

  const stepMap = heightMap.map((row, y) =>
    row.map((_col, x) => start.y === y && start.x === x)
  );

  if (start.x === -1 || end.x === -1) {
    console.error(start, end);
    throw new Error("Failed to find start and end.");
  }

  return { start, end, heightMap, stepMap };
};

const getPossibleMoves = (
  pos: Position,
  currentHeight: number,
  heightMap: number[][],
  stepMap: boolean[][]
): Position[] => {
  return MOD_MAP.filter((modifier) => {
    const { x, y } = { x: pos.x + modifier.x, y: pos.y + modifier.y };
    console.log(`Evaluating ${x} ${y}`);
    if (
      x < 0 ||
      y < 0 ||
      x >= heightMap[0].length ||
      y >= heightMap.length ||
      stepMap[y][x]
    ) {
      console.log(`\tUnsafe [out of bounds]`);
      return false;
    }
    const nextHeight = heightMap[y][x];
    if (POSSIBLE_HEIGHT_CHANGES.includes(currentHeight - nextHeight)) {
      console.log(`\tSafe [out of bounds]`);
      return true;
    }
    return false;
  }).map((modifier) => ({ x: pos.x + modifier.x, y: pos.y + modifier.y }));
};

const stepTo = (stepMap: boolean[][], ...positions: Position[]): boolean[][] =>
  stepMap.map((row, y) =>
    row.map(
      (value, x) =>
        value ||
        !!positions.find((position) => position.x === x && position.y === y)
    )
  );

export const part1 = (text: string): number => {
  const { start, end, heightMap, stepMap } = parseInput(text);

  return getBestMove(start, 0, end, heightMap, stepMap, 0);
};

const getBestMove = (
  currentPos: Position,
  height: number,
  goal: Position,
  heightMap: number[][],
  stepMap: boolean[][],
  iteration: number
): number => {
  const moves = getPossibleMoves(currentPos, height, heightMap, stepMap);
  const nextStepMap = stepTo(stepMap, ...moves);
  printStepMap(stepMap, heightMap);

  if (moves.length === 0) {
    return -1;
  }

  if (moves.find((move) => move === goal)) {
    printStepMap(stepMap, heightMap);
    return iteration + 1;
  }

  if (iteration === 10) {
    printStepMap(stepMap, heightMap);
    return iteration;
  }

  return Math.min(
    ...moves.map((nextPos) => {
      const nextHeight = heightMap[nextPos.y][nextPos.x];
      return getBestMove(
        nextPos,
        nextHeight,
        goal,
        heightMap,
        nextStepMap,
        iteration + 1
      );
    })
  );
};

function printStepMap(stepMap: boolean[][], heightMap: number[][]) {
  console.log(
    stepMap
      .map((row, y) =>
        row
          .map((value, x) =>
            value ? HEIGHT_APLHABET.charAt(heightMap[y][x]) : " "
          )
          .join("")
      )
      .join("\n")
  );
  console.log();
}
