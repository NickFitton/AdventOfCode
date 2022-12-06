import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getLocalProblemText } from "../../utils/getProblemText.ts";

import { part1, part2 } from "./main.ts";

Deno.test("Tuning Trouble - Part 1 iteration 1", () => {
  const solution1 = part1("mjqjpqmgbljsphdztnvjfqwrcgsmlb");
  assertEquals(solution1, 7);
});

Deno.test("Tuning Trouble - Part 1 iteration 2", () => {
  const solution2 = part1("bvwbjplbgvbhsrlpgdmjqwftvncz");
  assertEquals(solution2, 5);
});

Deno.test("Tuning Trouble - Part 1 iteration 3", () => {
  const solution3 = part1("nppdvjthqldpwncqszvftbrmjlhg");
  assertEquals(solution3, 6);
});

Deno.test("Tuning Trouble - Part 1 iteration 4", () => {
  const solution4 = part1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg");
  assertEquals(solution4, 10);
});

Deno.test("Tuning Trouble - Part 1 iteration 5", () => {
  const solution5 = part1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw");
  assertEquals(solution5, 11);
});

Deno.test("Tuning Trouble - Part 1", async () => {
  const text = await getLocalProblemText(2022, 6);
  const part2Solution = part1(text);

  assertEquals(part2Solution, 12);
});

Deno.test("Tuning Trouble - Part 2 iteration 1", () => {
  const solution1 = part2("mjqjpqmgbljsphdztnvjfqwrcgsmlb");
  assertEquals(solution1, 19);
});

Deno.test("Tuning Trouble - Part 2 iteration 2", () => {
  const solution2 = part2("bvwbjplbgvbhsrlpgdmjqwftvncz");
  assertEquals(solution2, 23);
});

Deno.test("Tuning Trouble - Part 2 iteration 3", () => {
  const solution3 = part2("nppdvjthqldpwncqszvftbrmjlhg");
  assertEquals(solution3, 23);
});

Deno.test("Tuning Trouble - Part 2 iteration 4", () => {
  const solution4 = part2("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg");
  assertEquals(solution4, 29);
});

Deno.test("Tuning Trouble - Part 2 iteration 5", () => {
  const solution5 = part2("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw");
  assertEquals(solution5, 26);
});

Deno.test("Tuning Trouble - Part 2", async () => {
  const text = await getLocalProblemText(2022, 6);
  const part2Solution = part2(text);

  assertEquals(part2Solution, 15);
});
