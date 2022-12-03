import "https://deno.land/x/arrays@v1.0.21/mod.ts";

const textToCompartments = (text: string): [string, string][] =>
  text
    .split("\n")
    .map((line) => [
      line.slice(0, line.length / 2),
      line.slice(line.length / 2),
    ]);

const itemToPriority = (text: string): number => {
  const asciiValue = text.charCodeAt(0);
  if (asciiValue < 91) {
    return asciiValue - 38;
  } else {
    return asciiValue - 96;
  }
};

const textToGroups = (text: string): [string[], string[], string[]][] => {
  return text
    .split("\n")
    .map((line) => line.split(""))
    .chunk(3) as [string[], string[], string[]][];
};

const priorityItemSums = (text: string): number => {
  return textToCompartments(text).reduce((acc, compartment) => {
    const repeat: string | undefined = compartment[0]
      .split("")
      .find((character) => compartment[1].includes(character));
    if (!repeat) {
      return acc;
    }
    return acc + itemToPriority(repeat);
  }, 0);
};

const stickerAttachmentEfforts = (text: string): number => {
  return textToGroups(text)
    .map(([a, b, c]) =>
      a.find((character) => b.includes(character) && c.includes(character))
    )
    .map((item) => (item ? itemToPriority(item) : 0))
    .reduce((a, b) => a + b);
};

export const part1 = priorityItemSums;
export const part2 = stickerAttachmentEfforts;
