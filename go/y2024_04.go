package main

import (
	"math"
	"strings"
)

var newline byte = 10
var colon byte = 58
var pipe byte = 124

func y2024_04_1(lines []string) float64 {
	points := float64(0)
	for _, line := range lines {
		winningAndMatchables := strings.Split(strings.Split(line, ":")[1], "|")

		winningNumbers := strings.Split(strings.Trim(winningAndMatchables[0], " "), " ")
		numberMap := make(map[string]int)
		for _, number := range winningNumbers {
			numberMap[number] = -1
		}

		matchableNumbers := strings.Split(strings.Trim(winningAndMatchables[1], " "), " ")
		for _, number := range matchableNumbers {
			if numberMap[number] == -1 {
				numberMap[number] = 1
			}
		}

		wins := float64(0)
		for _, v := range numberMap {
			if v == 1 {
				wins = wins + 1
			}
		}
		if wins != 0 {
			cardScore := math.Pow(2, wins-1)
			points = points + cardScore
		}
	}
	return points
}

func y2024_04_2(lines []string) int {
	cardCount := make([]int, len(lines))
	for c := 0; c < len(lines); c++ {
		cardCount[c] = 1
	}

	for cardNum, line := range lines {
		winningAndMatchables := strings.Split(strings.Split(line, ":")[1], "|")

		winningNumbers := strings.Split(strings.Trim(winningAndMatchables[0], " "), " ")
		numberMap := make(map[string]int)
		for _, number := range winningNumbers {
			numberMap[number] = -1
		}

		matchableNumbers := strings.Split(strings.Trim(winningAndMatchables[1], " "), " ")
		for _, number := range matchableNumbers {
			if numberMap[number] == -1 {
				numberMap[number] = 1
			}
		}

		wins := 0
		for _, v := range numberMap {
			if v == 1 {
				wins = wins + 1
			}
		}
		for i := 1; i <= wins; i++ {
			cardCount[cardNum+i] = cardCount[cardNum+i] + cardCount[cardNum]
		}
	}

	numberOfCards := 0
	for _, count := range cardCount {
		numberOfCards = numberOfCards + count
	}
	return numberOfCards
}
