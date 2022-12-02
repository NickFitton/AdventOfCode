import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

import { countOfIncreases, slidingCountOfIncreases, getText } from "./main.ts";

Deno.test("Part 1", async () => {
  const text = await getText();
  const increases = countOfIncreases(text);

  assertEquals(increases, 1374);
});

Deno.test("Part 2", async () => {
  const text = await getText();
  const increases = slidingCountOfIncreases(text);

  assertEquals(increases, 1418);
});
