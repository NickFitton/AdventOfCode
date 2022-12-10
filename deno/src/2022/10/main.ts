type Instruction =
  | { type: "noop" }
  | { type: "addx"; value: number }
  | { type: "invalid"; value: string };

const ADD_REGEX = /addx (?<value>-{0,1}\d+)/;
const CYCLES = [20, 60, 100, 140, 180, 220];

const getInstructionsFromText = (text: string): Instruction[] => {
  return text.split("\n").map((line) => {
    if (line === "noop") {
      return { type: "noop" };
    }
    const addMatch = ADD_REGEX.exec(line);
    if (addMatch) {
      return { value: parseInt(addMatch.groups!.value), type: "addx" };
    }
    return { type: "invalid", value: line };
  });
};

const firstProblem = (text: string): number => {
  const thing = getInstructionsFromText(text);
  let cycle = 0;
  let signal = 1;
  let signalBuffer = 0;

  thing.forEach((instruction) => {
    switch (instruction.type) {
      case "addx": {
        cycle++;
        signalBuffer = checkBuffer(cycle, signalBuffer, signal);
        cycle++;
        signalBuffer = checkBuffer(cycle, signalBuffer, signal);
        signal += instruction.value;
        break;
      }
      case "noop":
        cycle++;
        signalBuffer = checkBuffer(cycle, signalBuffer, signal);
        break;
      case "invalid":
        console.log("Something went wrong", instruction.value);
        break;
    }
  });

  return signalBuffer;
};

const spriteInDisplay = (
  spritePosition: number,
  crtPointer: number
): boolean => {
  return (
    spritePosition === crtPointer ||
    spritePosition === crtPointer - 1 ||
    spritePosition === crtPointer + 1
  );
};

const secondProblem = (text: string): string[] => {
  const instructions = getInstructionsFromText(text);
  let cycle = 0;
  let spritePosition = 1;
  const crtDisplay: string[] = [""];
  let queuedAction: { type: "addx"; value: number } | undefined;

  while (instructions.length > 0 || queuedAction) {
    let pushedQueueAction = false;
    if (crtDisplay[crtDisplay.length - 1].length === 40) {
      crtDisplay.push("");
    }

    if (!queuedAction) {
      const nextAction = instructions.shift();
      if (nextAction?.type === "addx") {
        queuedAction = nextAction;
        pushedQueueAction = true;
      }
    }

    crtDisplay[crtDisplay.length - 1] += spriteInDisplay(
      spritePosition,
      cycle % 40
    )
      ? "█"
      : " ";

    if (queuedAction && !pushedQueueAction) {
      spritePosition += queuedAction.value;
      queuedAction = undefined;
    }
    cycle++;
  }

  return crtDisplay;
};

export const part1 = firstProblem;
export const part2 = secondProblem;

function checkBuffer(cycle: number, signalBuffer: number, signal: number) {
  const interval = CYCLES.find((interval) => interval === cycle);
  if (interval) {
    signalBuffer += interval * signal;
  }
  return signalBuffer;
}
