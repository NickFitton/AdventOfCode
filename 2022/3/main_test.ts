import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

import { priorityItemSums, stickerAttachmentEfforts, getText } from "./main.ts";

Deno.test("Part 1", async () => {
  const text = await getText();
  const totalScore = priorityItemSums(text);

  assertEquals(totalScore, 7850);
});

Deno.test("Part 2", async () => {
  const text = await getText();
  const topThreeSum = stickerAttachmentEfforts(text);

  assertEquals(topThreeSum, 2581);
});
