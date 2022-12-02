export const getText = () => Deno.readTextFile("./input.txt");

export const fetchProblemData = async (): Promise<string> => {
  const textResponse = await fetch("https://adventofcode.com/2022/day/1/input");
  return textResponse.text();
};

const getElfTotals = (input: string): number[] =>
  input.split("\n\n").map((calorieGroup) =>
    calorieGroup
      .trim()
      .split("\n")
      .reduce((a, b) => a + parseInt(b), 0)
  );

export const getLargestLoad = (input: string): number => {
  return getElfTotals(input).reduce((elfA, elfB) =>
    elfA > elfB ? elfA : elfB
  );
};

export const getTopThreeSum = (input: string): number => {
  const elves = getElfTotals(input);
  elves.sort((elfA, elfB) => elfB - elfA);
  return elves.slice(0, 3).reduce((sum, elf) => sum + elf, 0);
};
