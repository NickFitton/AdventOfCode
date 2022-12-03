import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getLocalProblemText } from "../../utils/getProblemText.ts";

import { part1, part2 } from "./main.ts";

Deno.test("Calorie Counting - Part 1", async () => {
  const text = await getLocalProblemText(2022, 1);
  const part1Solution = part1(text);

  assertEquals(part1Solution, 24000);
});

Deno.test("Calorie Counting - Part 2", async () => {
  const text = await getLocalProblemText(2022, 1);
  const part2Solution = part2(text);

  assertEquals(part2Solution, 45000);
});
