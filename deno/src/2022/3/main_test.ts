import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getLocalProblemText } from "../../utils/getProblemText.ts";

import { part1, part2 } from "./main.ts";

Deno.test("Rucksack Reorganization - Part 1", async () => {
  const text = await getLocalProblemText(2022, 3);
  const part1Solution = part1(text);

  assertEquals(part1Solution, 157);
});

Deno.test("Rucksack Reorganization - Part 2", async () => {
  const text = await getLocalProblemText(2022, 3);
  const part2Solution = part2(text);

  assertEquals(part2Solution, 70);
});
