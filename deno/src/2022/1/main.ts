import { sum } from "../../utils/reducer.ts";
import { decreasing } from "../../utils/sort.ts";

const getElfTotals = (input: string): number[] =>
  input.split("\n\n").map((calorieGroup) =>
    calorieGroup
      .trim()
      .split("\n")
      .reduce((a, b) => a + parseInt(b), 0)
  );

const getLargestLoad = (input: string): number => {
  return getElfTotals(input).reduce((elfA, elfB) =>
    elfA > elfB ? elfA : elfB
  );
};

const getTopThreeSum = (input: string): number => {
  const elves = getElfTotals(input);
  elves.sort(decreasing);
  return elves.slice(0, 3).reduce(sum);
};

export const part1 = getLargestLoad;
export const part2 = getTopThreeSum;
