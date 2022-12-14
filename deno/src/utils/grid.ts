export const generate2dArray = <T>(
  width: number,
  depth: number,
  fill: T,
): T[][] => new Array(depth).fill(new Array(width).fill(fill));
