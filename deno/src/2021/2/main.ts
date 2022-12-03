export const getText = () => Deno.readTextFile("./input.txt");

const textToDirections = (text: string) =>
  text.split("\n").map((line) => {
    const [direction, distance] = line.split(" ") as [
      "forward" | "down" | "up",
      string
    ];
    return [direction, parseInt(distance)] as [
      "forward" | "down" | "up",
      number
    ];
  });

const navigateAbyss = (text: string): number => {
  const directions = textToDirections(text);
  const position = [0, 0];

  directions.forEach(([direction, distance]) => {
    switch (direction) {
      case "down":
        position[1] += distance;
        break;
      case "up":
        position[1] -= distance;
        break;
      case "forward":
        position[0] += distance;
        break;
    }
  });
  return position[0] * position[1];
};

const navigateAbyssWithAim = (text: string): number => {
  const directions = textToDirections(text);
  const position = [0, 0];
  let aim = 0;

  directions.forEach(([direction, distance]) => {
    switch (direction) {
      case "down":
        aim += distance;
        break;
      case "up":
        aim -= distance;
        break;
      case "forward":
        position[0] += distance;
        position[1] += aim * distance;
        break;
    }
  });
  return position[0] * position[1];
};

export const part1 = navigateAbyss;
export const part2 = navigateAbyssWithAim;
