import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {
  convertEachLineToObject,
  convertLineToObject,
  deepMap,
} from "./inputParser.ts";

type TestLine = {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
};

Deno.test("convertEachLineToObject", () => {
  const input = `456,846 -> 221,846
980,926 -> 73,19`;
  const regex = /(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/;

  const actual = convertEachLineToObject<TestLine>(input, regex);

  assertEquals(actual, [
    {
      x1: "456",
      y1: "846",
      x2: "221",
      y2: "846",
    },
    {
      x1: "980",
      y1: "926",
      x2: "73",
      y2: "19",
    },
  ]);
});

Deno.test("convertLineToObject", () => {
  const input = `456,846 -> 221,846`;
  const regex = /(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/;

  const actual = convertLineToObject<TestLine>(input, regex);

  assertEquals(actual, {
    x1: "456",
    y1: "846",
    x2: "221",
    y2: "846",
  });
});

Deno.test("deepMap", () => {
  const input = [
    ["1", "2", "3", "4", "5"],
    ["6", "7", "8", "9", "10"],
  ];

  const actual = deepMap(input, (value) => parseInt(value));

  assertEquals(actual, [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
  ]);
});
