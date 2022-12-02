import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

import { navigateAbyss, navigateAbyssWithAim, getText } from "./main.ts";

Deno.test("Part 1", async () => {
  const text = await getText();
  const depth = navigateAbyss(text);

  assertEquals(depth, 1815044);
});

Deno.test("Part 2", async () => {
  const text = await getText();
  const depth = navigateAbyssWithAim(text);

  assertEquals(depth, 1739283308);
});
