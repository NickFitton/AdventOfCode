import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getLocalProblemText } from "../../utils/getProblemText.ts";

import { part1, part2 } from "./main.ts";

Deno.test("Cathode-Ray Tube - Part 1", async () => {
  const text = await getLocalProblemText(2022, 10);
  const part1Solution = part1(text);

  assertEquals(part1Solution, 13140);
});

Deno.test("Cathode-Ray Tube - Part 2", async () => {
  const text = await getLocalProblemText(2022, 10);
  const part2Solution = part2(text);

  assertEquals(part2Solution, [
    "██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ",
    "███   ███   ███   ███   ███   ███   ███ ",
    "████    ████    ████    ████    ████    ",
    "█████     █████     █████     █████     ",
    "██████      ██████      ██████      ████",
    "███████       ███████       ███████     ",
  ]);
});
