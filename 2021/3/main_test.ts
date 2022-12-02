import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

import {
  generatePowerConsumption,
  getLifeSupportRating,
  getText,
} from "./main.ts";

Deno.test("Part 1", async () => {
  const text = await getText();
  const powerConsumption = generatePowerConsumption(text);

  assertEquals(powerConsumption, 3549854);
});

Deno.test("Part 2", async () => {
  const text = await getText();
  const depth = getLifeSupportRating(text);

  assertEquals(depth, 3765399);
});
