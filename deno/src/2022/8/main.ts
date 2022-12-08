const countVisibleTrees = (text: string): number => {
  const grid: number[][] = text
    .split("\n")
    .map((line) => line.split("").map((height) => parseInt(height)));

  let visibleTrees = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      const args: [number, number, number, number[][]] = [
        grid[y][x],
        x,
        y,
        grid,
      ];
      if (
        visibleFromLeft(...args) ||
        visibleFromRight(...args) ||
        visibleFromTop(...args) ||
        visibleFromBottom(...args)
      ) {
        visibleTrees++;
      }
    }
  }

  return visibleTrees;
};

const visibleFromLeft = (
  height: number,
  x: number,
  y: number,
  grid: number[][]
) => {
  for (let dX = x - 1; dX >= 0; dX--) {
    if (grid[y][dX] >= height) {
      return false;
    }
  }
  return true;
};
const visibleFromRight = (
  height: number,
  x: number,
  y: number,
  grid: number[][]
) => {
  for (let dX = x + 1; dX < grid.length; dX++) {
    if (grid[y][dX] >= height) {
      return false;
    }
  }
  return true;
};
const visibleFromTop = (
  height: number,
  x: number,
  y: number,
  grid: number[][]
) => {
  for (let dY = y - 1; dY >= 0; dY--) {
    if (grid[dY][x] >= height) {
      return false;
    }
  }
  return true;
};
const visibleFromBottom = (
  height: number,
  x: number,
  y: number,
  grid: number[][]
) => {
  for (let dY = y + 1; dY < grid[0].length; dY++) {
    if (grid[dY][x] >= height) {
      return false;
    }
  }
  return true;
};

export const part1 = countVisibleTrees;

const scoreFromLeft = (
  height: number,
  x: number,
  y: number,
  grid: number[][]
): number => {
  let count = 0;
  for (let dX = x - 1; dX >= 0; dX--) {
    count++;
    if (grid[y][dX] >= height) {
      return count;
    }
  }
  return count;
};
const scoreFromRight = (
  height: number,
  x: number,
  y: number,
  grid: number[][]
): number => {
  let count = 0;
  for (let dX = x + 1; dX < grid.length; dX++) {
    count++;
    if (grid[y][dX] >= height) {
      return count;
    }
  }
  return count;
};
const scoreFromTop = (
  height: number,
  x: number,
  y: number,
  grid: number[][]
): number => {
  let count = 0;
  for (let dY = y - 1; dY >= 0; dY--) {
    count++;
    if (grid[dY][x] >= height) {
      return count;
    }
  }
  return count;
};
const scoreFromBottom = (
  height: number,
  x: number,
  y: number,
  grid: number[][]
): number => {
  let count = 0;
  for (let dY = y + 1; dY < grid[0].length; dY++) {
    count++;
    if (grid[dY][x] >= height) {
      return count;
    }
  }
  return count;
};

const getHighestScenicScore = (text: string): number => {
  const grid: number[][] = text
    .split("\n")
    .map((line) => line.split("").map((height) => parseInt(height)));

  let topScenicScore = -1;

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid.length - 1; x++) {
      const args: [number, number, number, number[][]] = [
        grid[y][x],
        x,
        y,
        grid,
      ];
      const Left = scoreFromLeft(...args);
      const Right = scoreFromRight(...args);
      const Top = scoreFromTop(...args);
      const Bottom = scoreFromBottom(...args);
      const scenicScore = Left * Right * Top * Bottom;
      topScenicScore = Math.max(topScenicScore, scenicScore);
    }
  }
  return topScenicScore;
};

export const part2 = getHighestScenicScore;
