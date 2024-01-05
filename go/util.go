package main

import (
	"log"
	"os"
	"strings"
)

func readFileLines(filepath string) ([]string, error) {
	bs, err := os.ReadFile(filepath)
	if err != nil {
		return nil, err
	}
	return strings.Split(string(bs), "\n"), nil
}

func failOutIfErr(err error) {
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}

}
