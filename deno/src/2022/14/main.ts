const COORD_REGEX = /(\d+),(\d+)/g;
const SAND_SOURCE = { x: 500, y: 0 };

type Coords = { x: number; y: number };

const mapToArray = (map: YXMap): { grid: number[][]; origin: Coords } => {
  const yKeys = Object.keys(map).map((key) => parseInt(key));
  const minY = Math.min(...yKeys, SAND_SOURCE.y);
  const maxY = Math.max(...yKeys, SAND_SOURCE.y);

  const xKeys = Object.values(map).flatMap((xMap) =>
    Object.keys(xMap).map((key) => parseInt(key))
  );
  const minX = Math.min(...xKeys);
  const maxX = Math.max(...xKeys);

  const numberGrid: number[][] = [];
  const emptyRow = () => new Array(maxX - minX + 1).fill(0);

  for (let y = minY; y <= maxY; y++) {
    if (!map[y]) {
      numberGrid.push(emptyRow());
      continue;
    }
    const row: number[] = [];
    for (let x = minX; x <= maxX; x++) {
      row.push(map[y][x] ? 1 : 0);
    }
    numberGrid.push(row);
  }

  return { grid: numberGrid, origin: { x: minX, y: minY } };
};

const mapToFlooredArray = (
  map: YXMap
): { grid: number[][]; origin: Coords } => {
  const yKeys = Object.keys(map).map((key) => parseInt(key));
  const minY = Math.min(...yKeys, SAND_SOURCE.y);
  const maxY = Math.max(...yKeys, SAND_SOURCE.y) + 2;
  const height = maxY - minY;

  const xKeys = Object.values(map).flatMap((xMap) =>
    Object.keys(xMap).map((key) => parseInt(key))
  );
  const minX = Math.min(...xKeys, SAND_SOURCE.x - height);
  const maxX = Math.max(...xKeys, SAND_SOURCE.x + height);

  const numberGrid: number[][] = [];
  const emptyRow = () => new Array(maxX - minX + 1).fill(0);
  const floor = () => new Array(maxX - minX + 1).fill(1);

  for (let y = minY; y <= maxY; y++) {
    if (y === maxY) {
      numberGrid.push(floor());
      continue;
    }
    if (!map[y]) {
      numberGrid.push(emptyRow());
      continue;
    }
    const row: number[] = [];
    for (let x = minX; x <= maxX; x++) {
      row.push(map[y][x] ? 1 : 0);
    }
    numberGrid.push(row);
  }

  return { grid: numberGrid, origin: { x: minX, y: minY } };
};

const lineDirection = (
  pointA: Coords,
  pointB: Coords
): "horizontal" | "vertical" | "diagonal" | null => {
  const diffX = Math.abs(pointA.x - pointB.x);
  if (diffX === 0) {
    return "vertical";
  }
  const diffY = Math.abs(pointA.y - pointB.y);
  if (diffY === 0) {
    return "horizontal";
  }

  if (diffX === diffY) {
    return "diagonal";
  }
  return null;
};

const getCoordsFromText = (text: string): Coords[][] => {
  return text
    .split("\n")
    .map((line) =>
      (
        Array.from(line.matchAll(COORD_REGEX)) as [string, string, string][]
      ).map(([_match, x, y]) => ({ x: parseInt(x), y: parseInt(y) }))
    );
};

const plotHorizontal = (
  pointFrom: Coords,
  pointTo: Coords,
  map: YXMap
): void => {
  const y = pointFrom.y;
  if (!map[y]) {
    map[y] = {};
  }

  for (let plotX = pointFrom.x; plotX <= pointTo.x; plotX++) {
    map[y][plotX] = true;
  }
};

const plotVertical = (pointFrom: Coords, pointTo: Coords, map: YXMap): void => {
  const x = pointFrom.x;

  for (let plotY = pointFrom.y; plotY <= pointTo.y; plotY++) {
    if (!map[plotY]) {
      map[plotY] = {};
    }
    map[plotY][x] = true;
  }
};

type YXMap = Record<number, Record<number, boolean>>;

const plotLine = (pointA: Coords, pointB: Coords, map: YXMap): void => {
  const direction = lineDirection(pointA, pointB);
  switch (direction) {
    case "horizontal": // -------
      if (pointA.x > pointB.x) {
        plotHorizontal(pointB, pointA, map);
      } else {
        plotHorizontal(pointA, pointB, map);
      }
      break;
    case "vertical": // |
      if (pointA.y > pointB.y) {
        plotVertical(pointB, pointA, map);
      } else {
        plotVertical(pointA, pointB, map);
      }
      break;
    default:
      throw new Error(`Cannot plot line type ${direction}`);
  }
};
const accessPoint = (grid: number[][], y: number, x: number): number => {
  const point = grid[y][x];
  if (point === undefined) {
    throw new Error("Tried to access nonexistent point");
  }
  return point;
};

const dropGrain = (
  grid: number[][],
  gridOrigin: Coords,
  from: Coords
): Coords => {
  const pointer = { x: from.x - gridOrigin.x, y: from.y - gridOrigin.y };
  let rested = false;
  while (!rested) {
    if (accessPoint(grid, pointer.y + 1, pointer.x) === 0) {
      // There's nothing underneath the grain
      pointer.y++; // Drop down one
    } else if (accessPoint(grid, pointer.y + 1, pointer.x - 1) === 0) {
      // There's nothing under and to the left
      pointer.y++;
      pointer.x--;
    } else if (accessPoint(grid, pointer.y + 1, pointer.x + 1) === 0) {
      // There's nothing under and to the right
      pointer.y++;
      pointer.x++;
    } else {
      rested = true;
    }
  }

  grid[pointer.y][pointer.x] = 2; // Settle grain in the grid
  return { x: pointer.x + gridOrigin.x, y: pointer.y + gridOrigin.y };
};

const buildMap = (lines: Coords[][]): YXMap => {
  const map: YXMap = {};

  lines.forEach((line) => {
    for (let i = 1; i < line.length; i++) {
      plotLine(line[i - 1], line[i], map);
    }
  });
  return map;
};

export const part1 = (text: string): number => {
  const lines = getCoordsFromText(text);

  const map = buildMap(lines);

  const { grid, origin } = mapToArray(map);

  let restedGrains = 0;
  try {
    while (true) {
      dropGrain(grid, origin, SAND_SOURCE);
      restedGrains++;
    }
  } catch (e) {
    console.error(e);
  }

  return restedGrains;
};

export const part2 = (text: string): number => {
  const lines = getCoordsFromText(text);
  const map = buildMap(lines);

  const { grid, origin } = mapToFlooredArray(map);
  let restedGrains = 0;

  let lastGrain: Coords = { x: 0, y: 0 };

  while (JSON.stringify(lastGrain) !== JSON.stringify(SAND_SOURCE)) {
    lastGrain = dropGrain(grid, origin, SAND_SOURCE);
    restedGrains++;
  }

  return restedGrains;
};
