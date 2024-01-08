package main

import (
	"math"
)

var newline byte = 10
var colon byte = 58
var pipe byte = 124

func y2024_04_1(file []byte) float64 {
	points := float64(0)
	// try {} instantiation cardNumbers := map[string]bool{}
	cardNumbers := make(map[string]int)
	// mode can be "guff" "win" or "card"
	mode := "guff"
	currentNumber := []byte{}
	cardNo := 1
	for _, b := range file {
		if b == newline {
			number := string(currentNumber)
			applyNumberToMap(cardNumbers, mode, number)
			currentNumber = []byte{}
			mode = "guff"
			wins := float64(0)
			for _, v := range cardNumbers {
				if v == 1 {
					wins = wins + 1
				}
			}
			cardNumbers = make(map[string]int)
			cardNo = cardNo + 1
			if wins != 0 {
				cardScore := math.Pow(2, wins-1)
				points = points + cardScore
			}
			continue
			// Determine winnings
		} else if b == colon {
			mode = "win"
			currentNumber = []byte{}
			continue
		} else if b == pipe {
			mode = "card"
			continue
		}

		if b >= 48 && b <= 57 {
			currentNumber = append(currentNumber, b)
		} else if b == 32 && len(currentNumber) > 0 {
			number := string(currentNumber)
			applyNumberToMap(cardNumbers, mode, number)
			currentNumber = []byte{}
		}

	}
	return points
}

func applyNumberToMap(m map[string]int, mode string, numberStr string) {
	if mode == "win" {
		m[numberStr] = -1
	} else if m[numberStr] != 0 {
		m[numberStr] = 1
	}
}

func y2024_04_2(file []byte) int {
	// find out how many lines there are in the input
	// +1 to square of the lines (last one doesn't have new line)
	charCount := len(file) + 1
	lineLength := 0
	for i, b := range file {
		if b == newline {
			lineLength = i + 1
			break
		}
	}
	lineCount := charCount / lineLength
	cardCount := make([]int, lineCount)
	for c := 0; c < lineCount; c++ {
		cardCount[c] = 1
	}
	// try {} instantiation cardNumbers := map[string]bool{}
	cardNumbers := make(map[string]int)
	// mode can be "guff" "win" or "card"
	mode := "guff"
	currentNumber := []byte{}
	cardNo := 1
	for _, b := range file {
		if b == newline {
			number := string(currentNumber)
			applyNumberToMap(cardNumbers, mode, number)
			currentNumber = []byte{}
			mode = "guff"
			wins := 0
			for _, v := range cardNumbers {
				if v == 1 {
					wins = wins + 1
				}
			}
			for i := 0; i < wins; i++ {
				cardCount[cardNo+i] = cardCount[cardNo+i] + cardCount[cardNo-1]
			}
			cardNumbers = make(map[string]int)
			cardNo = cardNo + 1
			continue
			// Determine winnings
		} else if b == colon {
			mode = "win"
			currentNumber = []byte{}
			continue
		} else if b == pipe {
			mode = "card"
			continue
		}

		if b >= 48 && b <= 57 {
			currentNumber = append(currentNumber, b)
		} else if b == 32 && len(currentNumber) > 0 {
			number := string(currentNumber)
			applyNumberToMap(cardNumbers, mode, number)
			currentNumber = []byte{}
		}

	}
	numberOfCards := 0
	for _, count := range cardCount {
		numberOfCards = numberOfCards + count
	}
	return numberOfCards
}
