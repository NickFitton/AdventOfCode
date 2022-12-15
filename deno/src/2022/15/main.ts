import { getManhattanDistance } from "../../utils/grid.ts";
import { convertEachLineToObject } from "../../utils/inputParser.ts";
import { forInRange } from "../../utils/iterator.ts";
import { Position } from "../../utils/types.ts";

type SensorBeaconPair = {
  sensorX: string;
  sensorY: string;
  beaconX: string;
  beaconY: string;
};

type Pair = {
  sensor: Position;
  beacon: Position;
  distance: number;
};

const getPairs = (text: string): Pair[] => {
  return convertEachLineToObject<SensorBeaconPair>(
    text,
    /Sensor at x=(?<sensorX>-{0,1}\d+), y=(?<sensorY>-{0,1}\d+): closest beacon is at x=(?<beaconX>-{0,1}\d+), y=(?<beaconY>-{0,1}\d+)/
  ).map(({ sensorX, sensorY, beaconX, beaconY }) => {
    const sensor = { x: parseInt(sensorX), y: parseInt(sensorY) };
    const beacon = { x: parseInt(beaconX), y: parseInt(beaconY) };
    const distance = getManhattanDistance(sensor, beacon);
    return {
      sensor,
      beacon,
      distance,
    };
  });
};
/*
Sensor at x=173912, y=1873897: closest beacon is at x=429790, y=2000000
Sensor at x=1466100, y=1389028: closest beacon is at x=429790, y=2000000
Sensor at x=376161, y=2533578: closest beacon is at x=429790, y=2000000
Sensor at x=490678, y=388548: closest beacon is at x=429790, y=2000000
Sensor at x=86373, y=2839828: closest beacon is at x=429790, y=2000000
Sensor at x=19628, y=1589839: closest beacon is at x=429790, y=2000000
Sensor at x=575700, y=1390576: closest beacon is at x=429790, y=2000000
Sensor at x=273266, y=2050976: closest beacon is at x=429790, y=2000000
*/

export const part1 = (text: string, row: number): number => {
  const pairs: Pair[] = getPairs(text);

  const { min, max } = pairs.reduce(
    ({ min, max }, { sensor, beacon, distance }) => ({
      min: Math.min(min, sensor.x - distance, beacon.x),
      max: Math.max(max, sensor.x + distance, beacon.x),
    }),
    {
      min: pairs[0].sensor.x,
      max: pairs[0].sensor.x,
    }
  );

  let noBeacon = 0;

  for (let x = min; x <= max; x++) {
    if (pairs.find(({ beacon }) => beacon.x === x && beacon.y === row)) {
      continue;
    } else if (
      pairs.find(
        ({ sensor, distance }) =>
          getManhattanDistance(sensor, { x, y: row }) <= distance
      )
    ) {
      noBeacon++;
    }
  }
  return noBeacon;
};

export const part2 = (text: string, coordRestriction: number): number => {
  const pairs: Pair[] = getPairs(text);

  const possibleBeaconPositions: Position[] = [];

  const xRange = [0, coordRestriction];
  const yRange = [0, coordRestriction];
  for (let y = yRange[0]; y < yRange[1]; y++) {
    for (let x = xRange[0]; x < xRange[1]; x++) {
      const pairsWithinRange = pairs.filter(
        ({ sensor, distance }) =>
          getManhattanDistance(sensor, { x, y }) <= distance
      );
      const skippable = pairsWithinRange.reduce(
        (bestWidth, { sensor, distance }) => {
          const distanceFromSensor = getManhattanDistance(sensor, { x, y });
          let width = 0;
          if (x > sensor.x) {
            width = distance - Math.abs(x - sensor.x);
          } else if (distanceFromSensor < distance) {
            width =
              Math.abs(x - sensor.x) + (distance - Math.abs(y - sensor.y));
          } else {
            width = distance * 2;
          }

          return Math.max(width, bestWidth);
        },
        0
      );
      if (skippable > 0) {
        x += skippable;
      } else {
        possibleBeaconPositions.push({ x, y });
        console.log("beacon found: ", x, y);
      }
    }
  }

  if (possibleBeaconPositions.length > 1) {
    throw new Error("Too many possible beacon positions");
  }

  if (possibleBeaconPositions.length === 0) {
    throw new Error("No possible beacon positions");
  }

  return possibleBeaconPositions[0].x * 4000000 + possibleBeaconPositions[0].y;
};
/*

    if (pairs.find(({ sensor }) => sensor.x === x && sensor.y === row)) {
      rowMap += "S";
    } else if (pairs.find(({ beacon }) => beacon.x === x && beacon.y === row)) {
      rowMap += "B";
    } else if (
      pairs.find(
        ({ sensor, distance }) =>
          getManhattanDistance(sensor, { x, y: row }) <= distance
      )
    ) {
      rowMap += "#";
    } else {
      rowMap += ".";
    }
*/
