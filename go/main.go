package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	content, err := readFile("input.txt")
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
	sum := y2024_04_2(content)
	if sum < 30 {
		fmt.Println("Answer was too low")
	}
	if sum > 30 {
		fmt.Println("Answer was too high")
	}
	fmt.Println("Sum:", sum)
}
