export const getText = () => Deno.readTextFile("./input.txt");

/*
  Lose conditions = AZ BX CY
  Win conditions = AY BZ CX
  Draw conditions = AX BY CZ
*/

const textToActions = (text: string): ["A" | "B" | "C", "X" | "Y" | "Z"][] =>
  text
    .split("\n")
    .map((line) => line.split(" ") as ["A" | "B" | "C", "X" | "Y" | "Z"]);

const humanActionScoreMap = {
  X: 1,
  Y: 2,
  Z: 3,
};

const scoreMap = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

export const getTotalScore = (text: string) => {
  const actions = text
    .split("\n")
    .map((line) => line.split(" ") as ["A" | "B" | "C", "X" | "Y" | "Z"]);

  return actions.reduce(
    (score, [elf, human]) =>
      score + humanActionScoreMap[human] + scoreMap[elf][human],
    0
  );
};

/*
X means lose
Y means draw
Z means win
*/
const humanActionMap = {
  A: { X: "Z", Y: "X", Z: "Y" },
  B: { X: "X", Y: "Y", Z: "Z" },
  C: { X: "Y", Y: "Z", Z: "X" },
} as const;

const actionScoreMap = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

export const getAwkwardTotalScore = (text: string) => {
  const actions = textToActions(text);

  return actions.reduce((score, [elf, result]) => {
    const humanAction = humanActionMap[elf][result];
    return (
      score +
      actionScoreMap[elf][humanAction] +
      humanActionScoreMap[humanAction]
    );
  }, 0);
};
