type Line = {
  x1: number;
  y1: number;

  x2: number;
  y2: number;
};

const lineRegex = /(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/;

const textToLines = (
  text: string,
): { horizontal: Line[]; vertical: Line[]; other: Line[] } =>
  text
    .split("\n")
    .map((line) => lineRegex.exec(line)!.groups as unknown as Line)
    .reduce(
      ({ horizontal, vertical, other }, line) => {
        if (line.x1 === line.x2) {
          return { horizontal, vertical: [...vertical, line], other };
        } else if (line.y1 === line.y2) {
          return { horizontal: [...horizontal, line], vertical, other };
        }
        return { horizontal, vertical, other: [...other, line] };
      },
      { horizontal: [], vertical: [], other: [] } as Record<
        "horizontal" | "vertical" | "other",
        Line[]
      >,
    );

const countOverlappingLines = (text: string): number => {
  const { horizontal, vertical } = textToLines(text);

  // A 2D map of points and their iterations.
  const plot: Record<number, Record<number, number>> = {};

  horizontal.forEach((line) => {
    const points = [line.x1, line.x2];
    points.sort();

    for (let x = points[0]; x <= points[1]; x++) {
      if (!plot[x]) {
        plot[x] = {};
      }
      if (!plot[x][line.y1]) {
        plot[x][line.y1] = 0;
      }
      plot[x][line.y1]++;
    }
  });

  vertical.forEach((line) => {
    const points = [line.y1, line.y2];
    points.sort();

    if (!plot[line.x1]) {
      plot[line.x1] = {};
    }
    for (let y = points[0]; y <= points[1]; y++) {
      if (!plot[line.x1][y]) {
        plot[line.x1][y] = 0;
      }
      plot[line.x1][y]++;
    }
  });

  printPlot(plot);

  return Object.values(plot)
    .flatMap((record) => Object.values(record))
    .filter((crossings) => crossings > 1).length;
};

export const part1 = countOverlappingLines;

function printPlot(plot: Record<number, Record<number, number>>): void {
  for (let y = 0; y < 990; y++) {
    let line = "";
    for (let x = 0; x < 989; x++) {
      const plotPoint = plot[x]?.[y];
      line += plotPoint || ".";
    }
    console.log(line);
  }
}
// export const part2 = lastWinningBoardScore;
