import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getLocalProblemText } from "../../utils/getProblemText.ts";

import { part1, part2 } from "./main.ts";

Deno.test("Binary Diagnostic - Part 1", async () => {
  const text = await getLocalProblemText(2021, 3);
  const totalScore = part1(text);

  assertEquals(totalScore, 198);
});

Deno.test("Binary Diagnostic - Part 2", async () => {
  const text = await getLocalProblemText(2021, 3);
  const topThreeSum = part2(text);

  assertEquals(topThreeSum, 230);
});
