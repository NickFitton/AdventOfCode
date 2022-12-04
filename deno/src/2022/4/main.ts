import "https://deno.land/x/arrays@v1.0.21/mod.ts";

export type AssignmentPair = [[number, number], [number, number]];

/**
 * Takes text where each line contains `2-4,6-8` and converts each line to [[2, 4], [6, 8]]
 *
 * @private exported for testing
 */
export const textToElfAssignments = (text: string): AssignmentPair[] => {
  return text.split("\n").map((line) => {
    const assignments = line.split(",");
    return assignments.map((assignment) =>
      assignment.split("-").map((range) => parseInt(range))
    ) as AssignmentPair;
  });
};

/**
 * Takes an assignment pair and returns true if one is a subset of another
 *
 * @private exported for testing
 */
export const isSubset = (pair: AssignmentPair): boolean => {
  const [elf1, elf2] = pair;
  if (elf1[0] <= elf2[0] && elf1[1] >= elf2[1]) {
    return true;
  } else if (elf2[0] <= elf1[0] && elf2[1] >= elf1[1]) {
    return true;
  }
  return false;
};

function getItems(startAt: number, endAt: number) {
  const size = endAt - startAt + 1;
  return [...Array(size).keys()].map((i) => i + startAt);
}

const fullyContains = (text: string): number =>
  textToElfAssignments(text).reduce(
    (agg, assignment) => (isSubset(assignment) ? agg + 1 : agg),
    0
  );

const countOverlaps = (text: string): number =>
  textToElfAssignments(text).reduce(
    (agg, assignment) => (hasOverlap(assignment) ? agg + 1 : agg),
    0
  );

const hasOverlap = (pair: AssignmentPair): boolean => {
  const [elf1, elf2] = pair;
  const elf1Items = getItems(...elf1);
  const elf2Items = getItems(...elf2);

  return elf1Items.some((item) => elf2Items.includes(item));
};

export const part1 = fullyContains;
export const part2 = countOverlaps;
