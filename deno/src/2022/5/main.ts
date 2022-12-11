import "https://deno.land/x/arrays@v1.0.21/mod.ts";

type ContainerMap = Record<number, string[]>;

const buildContainers = (lines: string[]): ContainerMap => {
  let nextLine = lines.shift();
  const positions: ContainerMap = {};

  while (nextLine !== undefined && nextLine !== "") {
    (nextLine.split("").chunk(4) as string[][])
      .map((chunk) => chunk.join("").trim())
      .forEach((container, index) => {
        const column = index + 1;
        if (container !== "" && container[1] !== undefined) {
          const containerValue = container[1];
          if (!positions[column]) {
            positions[column] = [];
          }
          positions[column].unshift(containerValue);
        }
      });

    nextLine = lines.shift();
  }

  return positions;
};

const moveContainers = (text: string, craneModel: "9000" | "9001") => {
  const lines = text.split("\n");

  const positions = buildContainers(lines);

  let nextLine = lines.shift();
  let lineCount = 0;
  while (nextLine) {
    lineCount++;
    const actions = nextLine.match(/move (\d+) from (\d+) to (\d+)/);
    if (!actions) {
      throw new Error(
        `Failed to build actions from line ${nextLine} on action ${lineCount}`,
      );
    }
    const [_str, iterationsStr, fromStr, toStr] = actions;
    const iterations = parseInt(iterationsStr);
    const from = parseInt(fromStr);
    const to = parseInt(toStr);

    const movingContainers = [];
    for (let actionCount = 0; actionCount < iterations; actionCount++) {
      const movingContainer = positions[from].pop();
      if (!movingContainer) {
        throw new Error("Tried to pick up a container in an empty space");
      }
      movingContainers.push(movingContainer);
    }
    positions[to].push(
      ...(craneModel === "9000"
        ? movingContainers
        : movingContainers.reverse()),
    );

    nextLine = lines.shift();
  }

  return Object.values(positions)
    .map((column) => column.pop())
    .join("");
};

export const textToPositionsAndInstructions = (text: string): string => {
  return moveContainers(text, "9000");
};

export const part1 = textToPositionsAndInstructions;

export const groupStackContainers = (text: string): string => {
  return moveContainers(text, "9001");
};

export const part2 = groupStackContainers;
