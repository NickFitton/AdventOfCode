import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

import { part1, part2 } from "./main.ts";

const part1Input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

Deno.test("Treetop Tree House - Part 1", () => {
  const part2Solution = part1(part1Input);

  assertEquals(part2Solution, 13);
});

const part2Input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

Deno.test("Treetop Tree House - Part 2", () => {
  const part2Solution = part2(part2Input);

  assertEquals(part2Solution, 36);
});
