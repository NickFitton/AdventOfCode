package main

import (
	"slices"
	"strconv"
	"strings"
)

func y2024_01_1(lines []string) int {
	sum := 0
	for _, line := range lines {
		first := '0'
		last := '0'
		for _, r := range line {
			if r >= 49 && r <= 57 {
				first, last = assignRunes(first, r)
			}
		}
		lineNumber, parseErr := strconv.ParseInt(string([]rune{first, last}), 10, 8)
		failOutIfErr(parseErr)
		sum = sum + int(lineNumber)
	}
	return sum
}

// Recieve first and last as pointers and reassign the values
func assignRunes(first rune, new rune) (rune, rune) {
	if first == '0' {
		return new, new
	}
	return first, new
}

func y2024_01_2(lines []string) int {
	sum := 0
	for _, line := range lines {
		first, last := parseNumberAndTextStringsFromLine(line)
		lineNumber, parseErr := strconv.ParseInt(first+last, 10, 8)
		failOutIfErr(parseErr)
		sum = sum + int(lineNumber)
	}
	return sum
}

func parseNumberAndTextStringsFromLine(line string) (string, string) {
	first := ""
	last := ""

	for len(line) > 0 {
		if parsableNumber(line[0:1]) {
			first, last = assignNumber(first, line[0:1])
			line = line[1:]
			continue
		}
		number, found := parsableText(line)
		if found {
			first, last = assignNumber(first, number)
			line = line[1:]
			continue
		}
		line = line[1:]
	}

	return first, last
}

func assignNumber(first string, number string) (string, string) {
	if first == "" {
		return number, number
	}
	return first, number
}

var textNums = []string{"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}

// Takes a line of text
// If it starts with a textnum, it returns the numeric string value of it and true.
// Else it returns an empty string and false
func parsableText(line string) (string, bool) {
	index := slices.IndexFunc(textNums, func(textNum string) bool {
		return strings.HasPrefix(line, textNum)
	})
	if index == -1 {
		return "", false
	}
	return strconv.FormatInt(int64(index), 10), true
}

func parsableNumber(char string) bool {
	_, err := strconv.ParseInt(char, 10, 8)
	return err == nil
}
