package main

import (
	"strconv"
	"testing"
)

var questionOneLines = []string{
	"1abc2",
	"pqr3stu8vwx",
	"a1b2c3d4e5f",
	"treb7uchet",
}

var questionTwoLines = []string{
	"two1nine",
	"eightwothree",
	"abcone2threexyz",
	"xtwone3four",
	"4nineeightseven2",
	"zoneight234",
	"7pqrstsixteen",
}

func Test_2024_01_1(t *testing.T) {
	answer := int64(142)
	result := int64(y2024_01_1(questionOneLines))

	if result != answer {
		t.Errorf("Expected " + strconv.FormatInt(answer, 10) + " but recieved " + strconv.FormatInt(result, 10) + ".")
	}
}

func Benchmark_2024_01_1(b *testing.B) {
	for n := 0; n < b.N; n++ {
		y2024_01_1(questionOneLines)
	}
}

func Test_2024_01_2(t *testing.T) {
	answer := int64(281)
	result := int64(y2024_01_2(questionTwoLines))

	if result != answer {
		t.Errorf("Expected " + strconv.FormatInt(answer, 10) + " but recieved " + strconv.FormatInt(result, 10) + ".")
	}
}

func Benchmark_2024_01_2(b *testing.B) {
	for n := 0; n < b.N; n++ {
		y2024_01_2(questionTwoLines)
	}
}
