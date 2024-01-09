package main

import (
	"regexp"
	"strconv"
	"strings"
)

type almanacMap struct {
	destinationRangeStart int
	sourceRangeStart      int
	rangeLength           int
	diff                  int
}

func y2024_05_1(file []string) int {
	mapMatcher := regexp.MustCompile(`(?P<dest>\d+) +(?P<src>\d+) +(?P<range>\d+)`)
	seedsLine := file[0]
	seeds := strings.Split(strings.Split(seedsLine, ": ")[1], " ")
	transformingData := []int{}
	for _, seed := range seeds {
		data, err := strconv.Atoi(seed)
		failOutIfErr(err)
		transformingData = append(transformingData, data)
	}

	maps := []almanacMap{}
	for _, line := range file[1:] {
		match := mapMatcher.FindStringSubmatch(line)
		if match != nil {
			dest, destErr := strconv.Atoi(match[1])
			failOutIfErr(destErr)
			src, srcErr := strconv.Atoi(match[2])
			failOutIfErr(srcErr)
			rangeInt, rangeErr := strconv.Atoi(match[3])
			failOutIfErr(rangeErr)
			diff := dest - src
			maps = append(maps, almanacMap{destinationRangeStart: dest, sourceRangeStart: src, rangeLength: rangeInt, diff: diff})
		}
		if len(line) == 0 {
			newData := []int{}
			// it's time to put those maps in action
			for _, point := range transformingData {
				diff, ok := findMap(point, maps)
				if ok {
					newData = append(newData, point+diff)
				} else {
					newData = append(newData, point)
				}
			}
			transformingData = newData
			maps = []almanacMap{}
		}
	}
	min := transformingData[0]
	for _, location := range transformingData[1:] {
		if min > location {
			min = location
		}
	}
	return min
}

func findMap(src int, maps []almanacMap) (int, bool) {
	for _, mapT := range maps {
		if src >= mapT.sourceRangeStart && src <= mapT.sourceRangeStart+mapT.rangeLength {
			return mapT.diff, true
		}
	}
	return -1, false
}

type plotRange struct {
	start  int
	length int
}

func y2024_05_2(file []string) int {
	mapMatcher := regexp.MustCompile(`(?P<dest>\d+) +(?P<src>\d+) +(?P<range>\d+)`)
	ranges := []plotRange{}
	seedsLine := file[0]
	seedData := strings.Split(strings.Split(seedsLine, ": ")[1], " ")
	for i := 0; i+1 < len(seedData); i += 2 {
		start, err := strconv.Atoi(seedData[i])
		failOutIfErr(err)
		rangeNum, rangeErr := strconv.Atoi(seedData[i+1])
		failOutIfErr(rangeErr)
		ranges = append(ranges, plotRange{start: start, length: rangeNum})
	}

	maps := []almanacMap{}
	for _, line := range file[2:] {
		match := mapMatcher.FindStringSubmatch(line)
		if match != nil {
			maps = append(maps, buildMap(match))
		}
		if len(line) == 0 {
			// Time to compare plot ranges to maps
			travelledRanges := []plotRange{}
			untravelledRanges := ranges
			for _, m := range maps {
				leftOverRanges := []plotRange{}
				for _, r := range untravelledRanges {
					remainingRanges, travelledRange, didTravel := cutRangeWithMapAndTravel(r, m)
					if didTravel {
						travelledRanges = append(travelledRanges, travelledRange)
						leftOverRanges = append(leftOverRanges, remainingRanges...)
					} else {
						leftOverRanges = append(leftOverRanges, remainingRanges...)
					}
				}
				untravelledRanges = leftOverRanges
			}
			ranges = append(travelledRanges, untravelledRanges...)
			maps = []almanacMap{}

		}
	}

	minStart := ranges[0].start
	for _, r := range ranges[1:] {
		if minStart > r.start {
			minStart = r.start
		}
	}
	return minStart
}

func cutRangeWithMapAndTravel(r plotRange, m almanacMap) ([]plotRange, plotRange, bool) {
	rangeEnd := r.start + r.length
	mapEnd := m.sourceRangeStart + m.rangeLength
	var travelledRange plotRange
	didTravel := false
	untravelledRanges := []plotRange{}

	if between(m.sourceRangeStart, mapEnd, r.start) && between(m.sourceRangeStart, mapEnd, rangeEnd) {
		// range is fully contained by map
		travelledRange = plotRange{start: r.start + m.diff, length: r.length}
		didTravel = true

	} else if between(r.start, rangeEnd, m.sourceRangeStart) && between(r.start, rangeEnd, mapEnd) {
		// range fully encompasses map

		// left range
		untravelledRanges = append(untravelledRanges, plotRange{start: r.start, length: m.sourceRangeStart - r.start})
		// middle range
		travelledRange = plotRange{start: m.sourceRangeStart + m.diff, length: m.rangeLength}
		// right range
		untravelledRanges = append(untravelledRanges, plotRange{start: mapEnd, length: rangeEnd - mapEnd})
		didTravel = true

	} else if r.start <= m.sourceRangeStart && between(m.sourceRangeStart, mapEnd, rangeEnd) {
		// range is on left edge of map

		// left range
		untravelledRanges = append(untravelledRanges, plotRange{start: r.start, length: m.sourceRangeStart - r.start})
		// right range
		travelledRange = plotRange{start: m.sourceRangeStart + m.diff, length: r.length - (m.sourceRangeStart - r.start)}
		didTravel = true

	} else if between(m.sourceRangeStart, mapEnd, r.start) && rangeEnd >= mapEnd {
		// range is on right edge of map

		// left range
		travelledRange = plotRange{start: r.start + m.diff, length: r.length - (rangeEnd - mapEnd)}
		// right range
		untravelledRanges = append(untravelledRanges, plotRange{start: mapEnd, length: rangeEnd - mapEnd})
		didTravel = true

	} else {
		untravelledRanges = append(untravelledRanges, r)
	}

	return untravelledRanges, travelledRange, didTravel
}

func between(a int, b int, point int) bool {
	return point >= a && point <= b
}

func buildMap(match []string) almanacMap {
	dest, destErr := strconv.Atoi(match[1])
	failOutIfErr(destErr)
	src, srcErr := strconv.Atoi(match[2])
	failOutIfErr(srcErr)
	rangeInt, rangeErr := strconv.Atoi(match[3])
	failOutIfErr(rangeErr)
	diff := dest - src
	return almanacMap{destinationRangeStart: dest, sourceRangeStart: src, rangeLength: rangeInt, diff: diff}
}
