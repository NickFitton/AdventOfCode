package main

import (
	"fmt"
	"strconv"
)

func y2024_03_1(lines []string) int64 {
	lineLength := len(lines[0])
	lineCount := len(lines)
	sum := int64(0)
	for y, line := range lines {
		number := []rune{}
		isBounded := false
		for x, r := range line {

			if r >= 48 && r <= 57 {
				number = append(number, r)
				// check boundaries
				isBounded = isBounded || isTouchingSymbol(lines, x, y, lineLength, lineCount)
			} else if len(number) > 0 && isBounded {
				numStr := string(number)
				num, err := strconv.ParseInt(numStr, 10, 16)
				failOutIfErr(err)
				sum = sum + num
				number = []rune{}
				isBounded = false
			} else if len(number) > 0 {
				number = []rune{}
				isBounded = false
			}
		}
		if len(number) > 0 && isBounded {
			numStr := string(number)
			num, err := strconv.ParseInt(numStr, 10, 16)
			failOutIfErr(err)
			sum = sum + num
		}
	}
	return sum
}

func isTouchingSymbol(lines []string, x int, y int, xMax int, yMax int) bool {
	return isSymbol(lines, x-1, y-1, xMax, yMax) ||
		isSymbol(lines, x-1, y, xMax, yMax) ||
		isSymbol(lines, x-1, y+1, xMax, yMax) ||
		isSymbol(lines, x, y-1, xMax, yMax) ||
		isSymbol(lines, x, y+1, xMax, yMax) ||
		isSymbol(lines, x+1, y-1, xMax, yMax) ||
		isSymbol(lines, x+1, y, xMax, yMax) ||
		isSymbol(lines, x+1, y+1, xMax, yMax)
}

func isSymbol(lines []string, x int, y int, xMax int, yMax int) bool {
	if x < 0 || x >= xMax || y < 0 || y >= yMax {
		return false
	}
	b := lines[y][x]
	return !(b == 46 || (b >= 48 && b <= 57))
}

func y2024_03_2(lines []string) int64 {
	gearMap := make(map[string][]string)

	lineLength := len(lines[0])
	lineCount := len(lines)

	for y, line := range lines {
		number := []rune{}
		touchingGears := make(map[string]struct{})
		for x, r := range line {

			if r >= 48 && r <= 57 {
				number = append(number, r)
				for _, gear := range findTouchingGears(lines, x, y, lineLength, lineCount) {
					touchingGears[gear] = struct{}{}
				}
			} else if len(number) > 0 && len(touchingGears) > 0 {
				addTouchingGearsToGearMap(gearMap, number, touchingGears)
				number = []rune{}
				touchingGears = make(map[string]struct{})
			} else if len(number) > 0 {
				number = []rune{}
				touchingGears = make(map[string]struct{})
			}
		}
		if len(number) > 0 && len(touchingGears) > 0 {
			addTouchingGearsToGearMap(gearMap, number, touchingGears)
		}
	}

	sum := int64(0)
	for _, parts := range gearMap {
		if len(parts) == 2 {
			part1, err := strconv.ParseInt(parts[0], 10, 16)
			failOutIfErr(err)
			part2, err := strconv.ParseInt(parts[1], 10, 16)
			failOutIfErr(err)
			sum = sum + (part1 * part2)
		}
	}
	return sum
}

func addTouchingGearsToGearMap(gearMap map[string][]string, partNum []rune, touchingGears map[string]struct{}) {
	numStr := string(partNum)
	for gear := range touchingGears {
		if gearMap[gear] == nil {
			gearMap[gear] = []string{numStr}
		} else {
			gearMap[gear] = append(gearMap[gear], numStr)
		}
	}
}

func findTouchingGears(lines []string, x int, y int, xMax int, yMax int) []string {
	touchingGears := []string{}
	for dX := -1; dX <= 1; dX++ {
		for dY := -1; dY <= 1; dY++ {
			if dX == dY && dY == 0 {
				continue
			}
			if isGear(lines, x+dX, y+dY, xMax, yMax) {
				touchingGears = append(touchingGears, fmt.Sprintf("%v %v", y+dY, x+dX))
			}
		}
	}
	return touchingGears
}

func isGear(lines []string, x int, y int, xMax int, yMax int) bool {
	if x < 0 || x >= xMax || y < 0 || y >= yMax {
		return false
	}
	return lines[y][x] == 42
}
