import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getLocalProblemText } from "../../utils/getProblemText.ts";

import { part1, part2 } from "./main.ts";

Deno.test("Giant Squid - Part 1", async () => {
  const text = await getLocalProblemText(2021, 4);
  const totalScore = part1(text);

  assertEquals(totalScore, 4512);
});

// 35711 too high
Deno.test("Giant Squid - Part 2", async () => {
  const text = await getLocalProblemText(2021, 4);
  const topThreeSum = part2(text);

  assertEquals(topThreeSum, 1924);
});
