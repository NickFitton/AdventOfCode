package main

import (
	"testing"
)

var q4Lines = []byte("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11")

func Test_y2024_04_1(t *testing.T) {
	answer := float64(13)
	result := y2024_04_1(q4Lines)

	if result != answer {
		t.Errorf("Expected %v but recieved %v.", answer, result)
	}
}

// 4172 ns/op
func Benchmark_2024_04_1(b *testing.B) {
	for n := 0; n < b.N; n++ {
		y2024_04_1(q4Lines)
	}
}

func Test_y2024_04_2(t *testing.T) {
	answer := 30
	result := y2024_04_2(q4Lines)

	if result != answer {
		t.Errorf("Expected %v but recieved %v.", answer, result)
	}
}

// 4172 ns/op
func Benchmark_2024_04_2(b *testing.B) {
	for n := 0; n < b.N; n++ {
		y2024_04_2(q4Lines)
	}
}
