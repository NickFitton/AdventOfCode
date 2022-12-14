import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getLocalProblemText } from "../../utils/getProblemText.ts";

import { part1 } from "./main.ts";

// 4896 too low
Deno.test("Hydrothermal Venture - Part 1", async () => {
  const text = await getLocalProblemText(2021, 5);
  const totalScore = part1(text);

  assertEquals(totalScore, 5);
});

// Deno.test("Giant Squid - Part 2", async () => {
//   const text = await getLocalProblemText(2021, 5);
//   const topThreeSum = part2(text);

//   assertEquals(topThreeSum, 1924);
// });
