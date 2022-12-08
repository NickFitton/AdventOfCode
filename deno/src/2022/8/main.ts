type GridCheckArgs = {
  x: number;
  y: number;
  grid: number[][];
};

function textToGrid(text: string): number[][] {
  return text
    .split("\n")
    .map((line) => line.split("").map((height) => parseInt(height)));
}

const countVisibleTrees = (text: string): number => {
  const grid = textToGrid(text);

  let visibleTrees = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      const args = { x, y, grid };
      if (
        visibleFromLeft(args) ||
        visibleFromRight(args) ||
        visibleFromTop(args) ||
        visibleFromBottom(args)
      ) {
        visibleTrees++;
      }
    }
  }

  return visibleTrees;
};

const visibleFromLeft = ({ x, y, grid }: GridCheckArgs) => {
  const height = grid[y][x];
  for (let dX = x - 1; dX >= 0; dX--) {
    if (grid[y][dX] >= height) {
      return false;
    }
  }
  return true;
};
const visibleFromRight = ({ x, y, grid }: GridCheckArgs) => {
  const height = grid[y][x];
  for (let dX = x + 1; dX < grid.length; dX++) {
    if (grid[y][dX] >= height) {
      return false;
    }
  }
  return true;
};
const visibleFromTop = ({ x, y, grid }: GridCheckArgs) => {
  const height = grid[y][x];
  for (let dY = y - 1; dY >= 0; dY--) {
    if (grid[dY][x] >= height) {
      return false;
    }
  }
  return true;
};
const visibleFromBottom = ({ x, y, grid }: GridCheckArgs) => {
  const height = grid[y][x];
  for (let dY = y + 1; dY < grid[0].length; dY++) {
    if (grid[dY][x] >= height) {
      return false;
    }
  }
  return true;
};

export const part1 = countVisibleTrees;

const scoreFromLeft = ({ x, y, grid }: GridCheckArgs) => {
  const height = grid[y][x];
  let count = 0;
  for (let dX = x - 1; dX >= 0; dX--) {
    count++;
    if (grid[y][dX] >= height) {
      return count;
    }
  }
  return count;
};
const scoreFromRight = ({ x, y, grid }: GridCheckArgs) => {
  const height = grid[y][x];
  let count = 0;
  for (let dX = x + 1; dX < grid.length; dX++) {
    count++;
    if (grid[y][dX] >= height) {
      return count;
    }
  }
  return count;
};
const scoreFromTop = ({ x, y, grid }: GridCheckArgs) => {
  const height = grid[y][x];
  let count = 0;
  for (let dY = y - 1; dY >= 0; dY--) {
    count++;
    if (grid[dY][x] >= height) {
      return count;
    }
  }
  return count;
};
const scoreFromBottom = ({ x, y, grid }: GridCheckArgs) => {
  const height = grid[y][x];
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
      const args = { x, y, grid };
      const left = scoreFromLeft(args);
      const right = scoreFromRight(args);
      const top = scoreFromTop(args);
      const bottom = scoreFromBottom(args);
      const scenicScore = left * right * top * bottom;
      topScenicScore = Math.max(topScenicScore, scenicScore);
    }
  }
  return topScenicScore;
};

export const part2 = getHighestScenicScore;
