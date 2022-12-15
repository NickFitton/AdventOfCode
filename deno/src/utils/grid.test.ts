import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { angleOfLine } from "./grid.ts";

Deno.test("angleOfLine", async (test) => {
  await test.step("0°", () => {
    assertEquals(angleOfLine({ x: 0, y: 0 }, { x: 0, y: -1 }), 0);
  });
  await test.step("90°", () => {
    assertEquals(angleOfLine({ x: 0, y: 0 }, { x: 1, y: 0 }), 90);
  });
  await test.step("180°", () => {
    assertEquals(angleOfLine({ x: 0, y: 0 }, { x: 1, y: 0 }), 180);
  });
  await test.step("270°", () => {
    assertEquals(angleOfLine({ x: 0, y: 0 }, { x: 1, y: 0 }), 270);
  });
});
