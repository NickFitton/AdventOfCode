import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

import { getLargestLoad, getText, getTopThreeSum } from "./main.ts";

Deno.test("Part 1", async () => {
  const text = await getText();
  const largestLoad = getLargestLoad(text);

  assertEquals(largestLoad, 64929);
});

Deno.test("Part 2", async () => {
  const text = await getText();
  const topThreeSum = getTopThreeSum(text);

  assertEquals(topThreeSum, 193697);
});
