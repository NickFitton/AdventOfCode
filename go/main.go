package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	content, err := readFileLines("input.txt")
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
	sum := y2024_05_2(content)
	fmt.Println("Closest location:", sum)
}
