import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getLocalProblemText } from "../../utils/getProblemText.ts";

import { part1, part2 } from "./main.ts";

Deno.test("No Space Left On Device - Part 1", async () => {
  const text = await getLocalProblemText(2022, 7);
  const part2Solution = part1(text);

  assertEquals(part2Solution, 95437);
});

Deno.test("No Space Left On Device - Part 1", async () => {
  const text = await getLocalProblemText(2022, 7);
  const part2Solution = part2(text);

  assertEquals(part2Solution, 24933642);
});
