import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

import { getAwkwardTotalScore, getText, getTotalScore } from "./main.ts";

Deno.test("Part 1", async () => {
  const text = await getText();
  const totalScore = getTotalScore(text);

  assertEquals(totalScore, 11841);
});

Deno.test("Part 2", async () => {
  const text = await getText();
  const topThreeSum = getAwkwardTotalScore(text);

  assertEquals(topThreeSum, 13022);
});
