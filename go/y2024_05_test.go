package main

import (
	"testing"
)

var q5Lines = []string{
	"seeds: 79 14 55 13",
	"",
	"seed-to-soil map:",
	"50 98 2",
	"52 50 48",
	"",
	"soil-to-fertilizer map:",
	"0 15 37",
	"37 52 2",
	"39 0 15",
	"",
	"fertilizer-to-water map:",
	"49 53 8",
	"0 11 42",
	"42 0 7",
	"57 7 4",
	"",
	"water-to-light map:",
	"88 18 7",
	"18 25 70",
	"",
	"light-to-temperature map:",
	"45 77 23",
	"81 45 19",
	"68 64 13",
	"",
	"temperature-to-humidity map:",
	"0 69 1",
	"1 0 69",
	"",
	"humidity-to-location map:",
	"60 56 37",
	"56 93 4",
	"",
}

func Test_y2024_05_1(t *testing.T) {
	answer := 35
	result := y2024_05_1(q5Lines)

	if result != answer {
		t.Errorf("Expected %v but recieved %v.", answer, result)
	}
}

// 10535 ns/op
func Benchmark_2024_05_1(b *testing.B) {
	for n := 0; n < b.N; n++ {
		y2024_05_1(q5Lines)
	}
}

func Test_y2024_05_2(t *testing.T) {
	answer := 46
	result := y2024_05_2(q5Lines)

	if result != answer {
		t.Errorf("Expected %v but recieved %v.", answer, result)
	}
}

// 11806 ns/op
func Benchmark_2024_05_2(b *testing.B) {
	for n := 0; n < b.N; n++ {
		y2024_05_2(q5Lines)
	}
}
