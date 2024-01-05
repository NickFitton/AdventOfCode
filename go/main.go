package main

import (
	"fmt"
	"strconv"
)

func main() {
	number := int64(-1)
	number, err := strconv.ParseInt("1", 10, 8)
	failOutIfErr(err)
	fmt.Println(number)
	// lines, err := readFileLines("input.txt")
	// if err != nil {
	// 	log.Fatal(err)
	// 	os.Exit(1)
	// }
	// sum := y2024_02(lines)
	// fmt.Println(sum)
}
