export const getText = () => Deno.readTextFile("./input.txt");

const textToArray = (text: string): number[][] =>
  text.split("\n").map((line) => line.split("").map((bit) => parseInt(bit)));

export const generatePowerConsumption = (text: string): number => {
  const directions = textToArray(text);

  let mostCommonBits = "";
  let leastCommonBits = "";

  for (let x = 0; x < directions[1].length; x++) {
    const sumOfColumn = directions.reduce((agg, row) => {
      return agg + row[x];
    }, 0);

    if (sumOfColumn > directions.length / 2) {
      mostCommonBits += "1";
      leastCommonBits += "0";
    } else {
      mostCommonBits += "0";
      leastCommonBits += "1";
    }
  }

  const gamma = parseInt(mostCommonBits, 2);
  const epsilon = parseInt(leastCommonBits, 2);

  return gamma * epsilon;
};

export const getLifeSupportRating = (text: string): number => {
  return getOxygenRating(text) * getCarbonRating(text);
};

const getOxygenRating = (text: string): number => {
  let diagnostics = textToArray(text);
  let pointer = 0;

  while (diagnostics.length > 1 && pointer < diagnostics[0].length) {
    let oCount = 0;
    let iCount = 0;

    diagnostics.forEach((row) => {
      if (row[pointer] === 0) {
        oCount++;
      } else {
        iCount++;
      }
    });

    if (oCount > iCount) {
      diagnostics = includeOnly(diagnostics, pointer, 0);
    } else {
      diagnostics = includeOnly(diagnostics, pointer, 1);
    }

    pointer++;
  }

  return parseInt(diagnostics[0].join(""), 2);
};

const getCarbonRating = (text: string): number => {
  let diagnostics = textToArray(text);
  let pointer = 0;

  while (diagnostics.length > 1 && pointer < diagnostics[0].length) {
    let oCount = 0;
    let iCount = 0;

    diagnostics.forEach((row) => {
      if (row[pointer] === 0) {
        oCount++;
      } else {
        iCount++;
      }
    });

    if (oCount > iCount) {
      diagnostics = includeOnly(diagnostics, pointer, 1);
    } else {
      diagnostics = includeOnly(diagnostics, pointer, 0);
    }

    pointer++;
  }

  return parseInt(diagnostics[0].join(""), 2);
};

const includeOnly = (
  directions: number[][],
  column: number,
  valueMustBe: 0 | 1
): number[][] => {
  return directions.filter((row) => {
    return row[column] === valueMustBe;
  });
};
