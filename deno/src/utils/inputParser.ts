export const toLines = (input: string): string[] => input.split("\n");

export const toGroups = (input: string): string[] => input.split("\n\n");

export const toGrid = (input: string): string[][] =>
  toLines(input).map((line) => line.split(""));

export const deepMap = <T, U>(
  twoDArray: T[][],
  callbackfn: (value: T, index: number, array: T[]) => U,
) => twoDArray.map((row) => row.map(callbackfn));

export const convertEachLineToObject = <T>(input: string, regex: RegExp): T[] =>
  toLines(input).map((line) => convertLineToObject<T>(line, regex));

export const convertLineToObject = <T>(line: string, regex: RegExp) => {
  const matchGroups = line.match(regex)?.groups;
  if (!matchGroups) {
    throw new Error(`Couldn't match regex to line ["${regex}", "${line}"]`);
  }
  return matchGroups as unknown as T;
};
