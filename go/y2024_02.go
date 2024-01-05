package main

import (
	"strconv"
	"strings"
)

type bag struct {
	red   int64
	green int64
	blue  int64
}

var maxRed = int64(12)
var maxGreen = int64(13)
var maxBlue = int64(14)

func y2024_02(lines []string) int64 {
	sum := int64(0)

	for _, line := range lines {
		gameNum, err := strconv.ParseInt(strings.Split(line, ":")[0][5:], 10, 8)
		failOutIfErr(err)

		exceeded := isMaxExceeded(line)

		if !exceeded {
			sum = sum + gameNum
		}
	}

	return sum
}

func isMaxExceeded(line string) bool {
	scenario := strings.Split(line, ": ")[1]
	count := []rune{}

	for _, r := range scenario {
		if r >= 48 && r <= 57 {
			count = append(count, r)
			continue
		}
		if len(count) == 0 {
			continue
		}
		
		max := int64(0)
		// Interestingly, this is about 25% faster than using a map of run to int64
		switch r {
		case 'r':
			max = maxRed
		case 'g':
			max = maxGreen
		case 'b':
			max = maxBlue
		default:
			continue
		}
		number, err := strconv.ParseInt(string(count), 10, 8)
		failOutIfErr(err)
		if number > max {
			return true
		}
		count = []rune{}
	}
	return false

}

func y2024_02_2(lines []string) int64 {
	sum := int64(0)

	for _, line := range lines {
		red, green, blue := parseMaxInGame(line)
		sum = sum + (red * green * blue)
	}

	return sum
}

func parseMaxInGame(line string) (int64, int64, int64) {
	b := bag{
		red:   0,
		green: 0,
		blue:  0,
	}

	scenario := strings.Split(line, ": ")[1]
	handPicks := strings.Split(scenario, "; ")

	for _, hand := range handPicks {
		colors := strings.Split(hand, ", ")

		for _, color := range colors {
			info := strings.Split(color, " ")
			count, err := strconv.ParseInt(info[0], 10, 8)
			failOutIfErr(err)
			color := info[1]
			switch color {
			case "red":
				b.red = max(b.red, count)
			case "green":
				b.green = max(b.green, count)
			case "blue":
				b.blue = max(b.blue, count)
			}
		}
	}

	return b.red, b.green, b.blue

}
