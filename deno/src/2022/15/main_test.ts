import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getLocalProblemText } from "../../utils/getProblemText.ts";

import { part1, part2 } from "./main.ts";

Deno.test("Beacon Exclusion Zone - Part 1", async () => {
  const text = await getLocalProblemText(2022, 15);
  const part1Solution = part1(text, 10);

  assertEquals(part1Solution, 26);
});

Deno.test("Beacon Exclusion Zone - Part 2", async () => {
  const text = await getLocalProblemText(2022, 15);
  const part2Solution = part2(text, 20);

  assertEquals(part2Solution, 56000011);
});
