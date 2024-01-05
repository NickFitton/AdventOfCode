package main

import (
	"fmt"
)

func main() {
	runeMaxMap := map[rune]int64 {
		'r': 12,
		'g': 13,
		'b': 14,
	}
	target := 'r'
	fmt.Println(runeMaxMap['r'])
	fmt.Println(runeMaxMap[target])
	// lines, err := readFileLines("input.txt")
	// if err != nil {
	// 	log.Fatal(err)
	// 	os.Exit(1)
	// }
	// sum := y2024_02(lines)
	// fmt.Println(sum)
}
