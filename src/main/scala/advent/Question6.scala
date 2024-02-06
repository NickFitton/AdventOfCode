package advent

import scala.annotation.tailrec

object Question6 {

  @tailrec
  def parseGroups(
      groups: Array[String],
      allAnsweredSameSum: Int
  ): Int = {
    if (groups.isEmpty) {
      return allAnsweredSameSum
    }

    val firstGroupsPeople = groups(0).split("\n")
    val peopleCount = firstGroupsPeople.length
    val answerMap = parsePeople(firstGroupsPeople, Map())
    val allAnsweredSame =
      answerMap
        .filter((_, count) => count eq peopleCount)
        .size

    val restGroups = groups.slice(1, groups.length)
    parseGroups(restGroups, allAnsweredSameSum + allAnsweredSame)
  }

  @tailrec
  def parsePeople(
      people: Array[String],
      agg: Map[String, Int]
  ): Map[String, Int] = {
    if (people.isEmpty) {
      return agg
    }

    val firstPersonsAnswers = people(0).split("")
    val newAgg = applyAnswersToMap(firstPersonsAnswers, agg)
    val restPeople = people.slice(1, people.length)

    parsePeople(restPeople, newAgg)
  }

  @tailrec
  def applyAnswersToMap(
      answers: Array[String],
      agg: Map[String, Int]
  ): Map[String, Int] = {
    if (answers.isEmpty) {
      return agg
    }

    val answer = answers(0)
    val currentAggValue = agg.getOrElse(answer, 0)
    val newAgg = agg + (answer -> (currentAggValue + 1))

    applyAnswersToMap(
      answers.slice(1, answers.length),
      newAgg
    )
  }
}
