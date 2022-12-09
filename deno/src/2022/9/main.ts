function buildCommands(text: string) {
  return text.split("\n").map((line) => {
    const [direction, distance] = line.split(" ");
    return {
      direction: direction as "R" | "U" | "L" | "D",
      distance: parseInt(distance),
    };
  });
}

type Coords = {
  x: number;
  y: number;
};

const countTailPositions = (text: string): number => {
  let headX = 0;
  let headY = 0;

  let tailX = 0;
  let tailY = 0;

  const tailTouchPositions: Set<string> = new Set();

  const commands = buildCommands(text);

  commands.forEach(({ direction, distance }) => {
    for (let step = 0; step < distance; step++) {
      ({ x: headX, y: headY } = moveInDirection(
        { x: headX, y: headY },
        direction
      ));

      if (headX - tailX > 1) {
        tailX++;
        if (tailY !== headY) {
          tailY = headY;
        }
      } else if (tailX - headX > 1) {
        tailX--;
        if (tailY !== headY) {
          tailY = headY;
        }
      }
      if (headY - tailY > 1) {
        tailY++;
        if (tailX !== headX) {
          tailX = headX;
        }
      } else if (tailY - headY > 1) {
        tailY--;
        if (tailX !== headX) {
          tailX = headX;
        }
      }

      tailTouchPositions.add(`${tailX},${tailY}`);
    }
  });

  return tailTouchPositions.size;
};

export const part1 = countTailPositions;

const countLongTailPositions = (text: string): number => {
  const positions: Coords[] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  const tailTouchPositions = new Set<string>();

  const commands = buildCommands(text);

  commands.forEach(({ direction, distance }) => {
    for (let step = 0; step < distance; step++) {
      positions[0] = moveInDirection(positions[0], direction);

      for (let i = 1; i < positions.length; i++) {
        const { x: headX, y: headY } = positions[i - 1];
        const { x: tailX, y: tailY } = positions[i];
        const diffX = headX - tailX;
        const diffY = headY - tailY;
        const xDist = Math.max(Math.abs(diffX), 1);
        const yDist = Math.max(Math.abs(diffY), 1);
        if (xDist >= 2 || yDist >= 2) {
          positions[i] = {
            x: tailX + diffX / xDist,
            y: tailY + diffY / yDist,
          };
        }
      }
      tailTouchPositions.add(`${positions[9].x},${positions[9].y}`);
    }
  });

  return tailTouchPositions.size;
};

export const part2 = countLongTailPositions;

function moveInDirection({ x, y }: Coords, direction: string) {
  switch (direction) {
    case "R":
      x++;
      break;
    case "U":
      y++;
      break;
    case "L":
      x--;
      break;
    case "D":
      y--;
      break;
  }
  return { x, y };
}
