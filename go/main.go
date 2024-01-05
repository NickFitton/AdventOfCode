package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	lines, err := readFileLines("input.txt")
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
	sum := y2024_02(lines)
	fmt.Println(sum)
}
