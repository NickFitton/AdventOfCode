package main

import (
	"strconv"
	"testing"
)

var lines = []string{
	"Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
	"Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
	"Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
	"Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
	"Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
}

func Test_2024_2(t *testing.T) {
	answer := int64(8)
	result := y2024_02(lines)

	if result != answer {
		t.Errorf("Expected " + strconv.FormatInt(answer, 10) + " but recieved " + strconv.FormatInt(result, 10) + ".")
	}
}

// 1527 ns/op
func Benchmark_2024_02_1(b *testing.B) {
	for n := 0; n < b.N; n++ {
		y2024_02(lines)
	}
}

func Test_2024_02_1_2(t *testing.T) {
	answer := int64(2286)
	result := int64(y2024_02_2(lines))

	if result != answer {
		t.Errorf("Expected " + strconv.FormatInt(answer, 10) + " but recieved " + strconv.FormatInt(result, 10) + ".")
	}
}

// 2950 ns/op
func Benchmark_2024_02_1_2(b *testing.B) {
	for n := 0; n < b.N; n++ {
		y2024_02_2(lines)
	}
}
