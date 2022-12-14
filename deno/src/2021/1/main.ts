import { sum as libSum } from "../../utils/reducer.ts";

export const getText = () => Deno.readTextFile("./input.txt");

const textToDepths = (text: string) =>
  text.split("\n").map((line) => parseInt(line));

const sum = (array: number[]): number => array.reduce(libSum);

const countOfIncreases = (text: string): number => {
  const depths = textToDepths(text);
  let increments = 0;
  let pDepth: number | undefined = undefined;

  depths.forEach((depth) => {
    if (pDepth && pDepth < depth) {
      increments++;
    }
    pDepth = depth;
  });
  return increments;
};

const slidingCountOfIncreases = (text: string): number => {
  const depths = textToDepths(text);
  let increments = 0;

  let pSlidingDepth: [number, number, number] = [-1, -1, -1];

  depths.forEach((depth) => {
    const newDepth = [...pSlidingDepth, depth].slice(1) as [
      number,
      number,
      number
    ];

    if (
      pSlidingDepth.every((depth) => depth !== -1) &&
      sum(newDepth) > sum(pSlidingDepth)
    ) {
      increments++;
    }

    pSlidingDepth = newDepth;
  });

  return increments;
};

export const part1 = countOfIncreases;
export const part2 = slidingCountOfIncreases;
