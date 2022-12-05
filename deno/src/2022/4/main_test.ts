import {
  assert,
  assertEquals,
  assertFalse,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getLocalProblemText } from "../../utils/getProblemText.ts";

import {
  AssignmentPair,
  isSubset,
  part1,
  part2,
  textToElfAssignments,
} from "./main.ts";

Deno.test("textToElfAssignments", () => {
  const assignments = textToElfAssignments(`2-4,6-8`);
  assertEquals(assignments, [
    [
      [2, 4],
      [6, 8],
    ],
  ]);
});

Deno.test("isSubset", () => {
  const pair1 = [
    [2, 3],
    [4, 5],
  ] as AssignmentPair;
  assertFalse(isSubset(pair1));

  const pair2 = [
    [5, 7],
    [7, 9],
  ] as AssignmentPair;
  assertFalse(isSubset(pair2));

  const pair3 = [
    [2, 8],
    [3, 7],
  ] as AssignmentPair;
  assert(isSubset(pair3));

  const pair4 = [
    [6, 6],
    [4, 6],
  ] as AssignmentPair;
  assert(isSubset(pair4));

  const pair5 = [
    [2, 6],
    [4, 8],
  ] as AssignmentPair;
  assertFalse(isSubset(pair5));
});

Deno.test("Camp Cleanup - Part 1", async () => {
  const text = await getLocalProblemText(2022, 4);
  const part1Solution = part1(text);

  assertEquals(part1Solution, 2);
});

Deno.test("Camp Cleanup - Part 2", async () => {
  const text = await getLocalProblemText(2022, 4);
  const part2Solution = part2(text);

  assertEquals(part2Solution, 4);
});
