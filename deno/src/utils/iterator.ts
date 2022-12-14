export const forInRange = (
  xRange: [number, number],
  yRange: [number, number],
  doFn: (x: number, y: number) => void,
) => {
  for (let y = yRange[0]; y < yRange[1]; y++) {
    for (let x = xRange[0]; x < xRange[1]; x++) {
      doFn(y, x);
    }
  }
};
