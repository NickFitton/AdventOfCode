package main

import (
	"errors"
	"regexp"
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

		red, green, blue := parseMaxInGame(line)

		if red <= maxRed && blue <= maxBlue && green <= maxGreen {
			sum = sum + gameNum
		}
	}

	return sum
}

func y24_2_1faster(lines []string) int64 {
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
		// If rune is a unicode number
		// Rune is "r"
		if r == 114 {
			number, err := strconv.ParseInt(string(count), 10, 8)
			failOutIfErr(err)
			if number > maxRed {
				return true
			}
			count = []rune{}
			// Rune is "g"
		} else if r == 103 {
			number, err := strconv.ParseInt(string(count), 10, 8)
			failOutIfErr(err)
			if number > maxGreen {
				return true
			}
			count = []rune{}
		} else if r == 98 {
			number, err := strconv.ParseInt(string(count), 10, 8)
			failOutIfErr(err)
			if number > maxBlue {
				return true
			}
			count = []rune{}
		}
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

func gameNumber(line string, regex regexp.Regexp) (int64, error) {
	submatch := regex.FindStringSubmatch(line)
	if submatch == nil {
		return -1, errors.New("failed to find a string")
	}
	parsedGameNumber, parseErr := strconv.ParseInt(submatch[1], 10, 8)
	if parseErr != nil {
		return -1, errors.New("failed to parse given number: " + submatch[1])
	}
	return parsedGameNumber, nil
}
