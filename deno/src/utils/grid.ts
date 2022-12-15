import { Position, Direction } from "./types.ts";

export const generate2dArray = <T>(
  width: number,
  depth: number,
  fill: T
): T[][] => new Array(depth).fill(new Array(width).fill(fill));

/**
 * Takes two points, returning the direction those points are pointing, otherwise returning null.
 */
// export const directionOfLine = (
//   pointA: Position,
//   pointB: Position
// ): Direction | null => {
//   const diffX = pointA.x - pointB.x;
//   const absDiffX = Math.abs(diffX);
//   const diffY = pointA.y - pointB.y;
//   const absDiffY = Math.abs(diffY);

//   if (diffX === 0 && diffY === 0) {
//     return;
//   }
//   if (absDiffX === absDiffY) {
//     if (diffX === diffY) {
//       return;
//     }
//   }
// };

// export const angleOfLine = (pointA: Position, pointB: Position): number => {
//   const diffX = Math.abs(pointB.x - pointA.x);
//   const diffY = Math.abs(pointB.y - pointA.y);

//   let atan = (Math.atan(diffY / diffX) / Math.PI) * 180;
//   if (diffX < 0 || diffY < 0) atan += 180;
//   if (diffX > 0 && diffY < 0) atan -= 180;
//   if (atan < 0) atan += 360;

//   return atan % 360;
// };

// export const angleOfLine = (pointA: Position, pointB: Position): number => {
//   const height = Math.abs(pointA.y - pointB.y);
//   const width = Math.abs(pointA.x - pointB.x);

//   const tan = Math.tan(width / height);
//   console.log(width, height, tan);
//   if (pointA.y < pointB.y) {
//     // Top
//     if (pointA.x < pointB.x) {
//       // Right
//     } else {
//       // Left
//     }
//   } else {
//     // Bottom
//     if (pointA.x < pointB.x) {
//       // Right
//     } else {
//       // Left
//     }
//   }
// };

export const getManhattanDistance = (
  pointA: Position,
  pointB: Position
): number => Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y);
