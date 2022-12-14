import { Position } from "../../utils/types.ts";

const HEIGHT_APLHABET = "SabcdefghijklmnopqrstuvwxyzE";

const MOD_MAP: Position[] = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

const getUniques = (positions: Position[]): Position[] =>
  Object.values(
    positions.reduce(
      (acc, next) => ({ ...acc, [`${next.x},${next.y}`]: next }),
      {} as Record<string, Position>,
    ),
  );

const parseInput = (
  text: string,
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
  heightMap: number[][],
  stepMap: boolean[][],
): Position[] => {
  const currentHeight: number = heightMap[pos.y][pos.x];
  return MOD_MAP.filter((modifier) => {
    const { x, y } = { x: pos.x + modifier.x, y: pos.y + modifier.y };
    if (positionOutOfBounds(x, y, heightMap, stepMap)) {
      return false;
    }
    const nextHeight = heightMap[y][x];
    if (currentHeight - nextHeight >= -1) {
      return true;
    }
    return false;
  }).map((modifier) => ({ x: pos.x + modifier.x, y: pos.y + modifier.y }));
};

const getPossibleReverseMoves = (
  pos: Position,
  heightMap: number[][],
  stepMap: boolean[][],
): Position[] => {
  const currentHeight: number = heightMap[pos.y][pos.x];
  return MOD_MAP.filter((modifier) => {
    const { x, y } = { x: pos.x + modifier.x, y: pos.y + modifier.y };
    if (positionOutOfBounds(x, y, heightMap, stepMap)) {
      return false;
    }
    const nextHeight = heightMap[y][x];
    if (currentHeight - nextHeight <= 1) {
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
        !!positions.find((position) => position.x === x && position.y === y),
    )
  );

export const part1 = (text: string): number => {
  let { start, end, heightMap, stepMap } = parseInput(text);

  const nextPositions = getPossibleMoves(start, heightMap, stepMap);
  if (nextPositions.find((position) => position === end)) {
    return 1;
  }

  stepMap = stepTo(stepMap, ...nextPositions);

  return getNextMoves(nextPositions, end, heightMap, stepMap, 1);
};

const getNextMoves = (
  currentPositions: Position[],
  goal: Position,
  heightMap: number[][],
  stepMap: boolean[][],
  iteration: number,
): number => {
  let positionSet = currentPositions.flatMap((postion) =>
    getPossibleMoves(postion, heightMap, stepMap)
  );
  // printStepMap(stepMap, heightMap);

  positionSet = getUniques(positionSet);
  if (positionSet.length === 0) {
    // printStepMap(stepMap, heightMap);
    return -1;
  }
  if (
    positionSet.find(
      (position) => `${position.x},${position.y}` === `${goal.x},${goal.y}`,
    )
  ) {
    return iteration + 1;
  }

  stepMap = stepTo(stepMap, ...positionSet);

  return getNextMoves(positionSet, goal, heightMap, stepMap, iteration + 1);
};

export const part2 = (text: string): number => {
  let { end, heightMap, stepMap } = parseInput(text);

  const nextPositions = getPossibleReverseMoves(end, heightMap, stepMap);
  if (
    nextPositions.find((position) => heightMap[position.y][position.x] <= 1)
  ) {
    return 1;
  }

  stepMap = stepTo(stepMap, ...nextPositions);

  return getReverseNextMoves(nextPositions, heightMap, stepMap, 1);
};

const getReverseNextMoves = (
  currentPositions: Position[],
  heightMap: number[][],
  stepMap: boolean[][],
  iteration: number,
): number => {
  let positionSet = currentPositions.flatMap((postion) =>
    getPossibleReverseMoves(postion, heightMap, stepMap)
  );
  // printStepMap(stepMap, heightMap);

  positionSet = getUniques(positionSet);
  if (positionSet.length === 0) {
    // printStepMap(stepMap, heightMap);
    return -1;
  }
  if (positionSet.find((position) => heightMap[position.y][position.x] <= 1)) {
    return iteration + 1;
  }

  stepMap = stepTo(stepMap, ...positionSet);

  return getReverseNextMoves(positionSet, heightMap, stepMap, iteration + 1);
};

function positionOutOfBounds(
  x: number,
  y: number,
  heightMap: number[][],
  stepMap: boolean[][],
) {
  return (
    x < 0 ||
    y < 0 ||
    x >= heightMap[0].length ||
    y >= heightMap.length ||
    stepMap[y][x]
  );
}

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
      .join("\n"),
  );
  console.log();
}
