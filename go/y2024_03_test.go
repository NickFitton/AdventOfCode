package main

import (
	"strconv"
	"testing"
)

var q3Lines = []string{
	"467..114..",
	"...*......",
	"..35..633.",
	"......#...",
	"617*......",
	".....+.58.",
	"..592.....",
	"......755.",
	"...$.*....",
	".664.598..",
}

func Test_2024_03_1(t *testing.T) {
	answer := int64(4361)
	result := y2024_03_1(q3Lines)

	if result != answer {
		t.Errorf("Expected " + strconv.FormatInt(answer, 10) + " but recieved " + strconv.FormatInt(result, 10) + ".")
	}
}

// 715.9 ns/op
func Benchmark_2024_03_1(b *testing.B) {
	for n := 0; n < b.N; n++ {
		y2024_03_1(q3Lines)
	}
}

func Test_2024_03_1_2(t *testing.T) {
	answer := int64(467835)
	result := int64(y2024_03_2(q3Lines))

	if result != answer {
		t.Errorf("Expected " + strconv.FormatInt(answer, 10) + " but recieved " + strconv.FormatInt(result, 10) + ".")
	}
}

// 2478 ns/op
func Benchmark_2024_03_1_2(b *testing.B) {
	for n := 0; n < b.N; n++ {
		y2024_03_2(q3Lines)
	}
}
