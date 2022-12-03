const getElfTotals = (input: string): number[] =>
  input.split("\n\n").map((calorieGroup) =>
    calorieGroup
      .trim()
      .split("\n")
      .reduce((a, b) => a + parseInt(b), 0)
  );

const getLargestLoad = (input: string): number => {
  return getElfTotals(input).reduce((elfA, elfB) => elfA > elfB ? elfA : elfB);
};

const getTopThreeSum = (input: string): number => {
  const elves = getElfTotals(input);
  elves.sort((elfA, elfB) => elfB - elfA);
  return elves.slice(0, 3).reduce((sum, elf) => sum + elf, 0);
};

export const part1 = getLargestLoad;
export const part2 = getTopThreeSum;
