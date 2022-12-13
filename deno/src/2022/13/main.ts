type NestedList = (number | NestedList)[];

const compare = (left: NestedList, right: NestedList): boolean | null => {
  while (left.length > 0 || right.length > 0) {
    const takeLeft = left.shift();
    const takeRight = right.shift();
    if (takeLeft === undefined) {
      return true;
    }
    if (takeRight === undefined) {
      return false;
    }

    if (typeof takeLeft === "number" && typeof takeRight === "number") {
      if (takeLeft > takeRight) {
        return false;
      }
      if (takeLeft < takeRight) {
        return true;
      }
      continue;
    } else if (Array.isArray(takeLeft) && Array.isArray(takeRight)) {
      const comparison = compare(takeLeft, takeRight);
      if (comparison !== null) {
        return comparison;
      }
    } else if (Array.isArray(takeLeft)) {
      const comparison = compare(takeLeft, [takeRight]);
      if (comparison !== null) {
        return comparison;
      }
    } else if (Array.isArray(takeRight)) {
      const comparison = compare([takeLeft], takeRight);
      if (comparison !== null) {
        return comparison;
      }
    } else {
      throw new Error("Reached unexpected case.");
    }
  }
  return null;
};

const textToPairs = (text: string): [NestedList, NestedList][] =>
  text
    .split("\n\n")
    .map(
      (pair) =>
        pair.split("\n").map((side) => JSON.parse(side)) as [
          NestedList,
          NestedList
        ]
    );

const textToLists = (text: string): NestedList[] =>
  text
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line) as NestedList);

export const part1 = (text: string): number => {
  const pairs = textToPairs(text);
  const goodPairs: number[] = [];

  pairs.forEach(([left, right], i) => {
    if (compare(left, right)) {
      goodPairs.push(i + 1);
    }
  });

  console.log(goodPairs);

  return goodPairs.reduce((a, b) => a + b);
};

const clone = <T>(array: T[]): T[] => JSON.parse(JSON.stringify(array));

export const part2 = (text: string): number => {
  const dividerPackageOne = [[2]];
  const dividerPackageTwo = [[6]];
  const lists = [...textToLists(text), dividerPackageOne, dividerPackageTwo];

  lists.sort((listA, listB) => (compare(clone(listA), clone(listB)) ? -1 : 1));

  return (
    (lists.indexOf(dividerPackageOne) + 1) *
    (lists.indexOf(dividerPackageTwo) + 1)
  );
};
