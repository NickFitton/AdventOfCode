package advent

import scala.annotation.tailrec
import advent.shapes.PasswordRuleset
import advent.shapes.BagRule

object Solutions {
  def question1a(input: String): Int = {
    val numbers = input.split("\n").map(line => line.toInt)
    val found =
      Question1.findSumsTo2020(numbers(0), numbers.slice(1, numbers.length))
    if (found.length != 2) {
      return -1
    } else {
      return found(0) * found(1)
    }
  }

  def question1b(input: String): Int = {
    val numbers = input.split("\n").map(line => line.toInt)
    val found =
      Question1.firstDepth(numbers(0), numbers.slice(1, numbers.length))

    if (found.isDefined) {
      val trio = found.get
      return trio(0) * trio(1) * trio(2)
    } else {
      return -1
    }
  }

  def question2a(input: String): Int = {
    input
      .split("\n")
      .map(line => Question2.parseLineAsRuleSet(line))
      .filter(ruleset => ruleset.isValidA())
      .length
  }

  def question2b(input: String): Int = {
    input
      .split("\n")
      .map(line => Question2.parseLineAsRuleSet(line))
      .filter(ruleset => ruleset.isValidB())
      .length
  }

  def question3a(input: String): Int = {
    val lines = input.split("\n")
    Question3.traverseArea(0, lines, 0, 3, 1)
  }

  def question3b(input: String): Long = {
    val lines = input.split("\n")
    Array(
      Array(1, 1),
      Array(3, 1),
      Array(5, 1),
      Array(7, 1),
      Array(1, 2)
    )
      .map(rightDown =>
        Question3.traverseArea(0, lines, 0, rightDown(0), rightDown(1))
      )
      .map(int => int.toLong)
      .reduce((a, b) => a * b)
  }

  def question4a(input: String): Int = {
    input
      .split("\n\n")
      .map(passportLines => passportLines.replaceAll("\n", " "))
      .filter(Question4.passportIsValid)
      .length
  }

  def question4b(input: String): Int = {
    input
      .split("\n\n")
      .map(passportLines => passportLines.replaceAll("\n", " "))
      .filter(Question4.passportIsMoreValid)
      .length
  }

  def question5a(input: String): Int = {
    input
      .split("\n")
      .map(boardingPass => {
        val (row, col) = Question5.parsePassToRowAndCol(boardingPass)
        (row * 8) + col
      })
      .reduce((a, b) => { if (a > b) a else b })
  }

  def question5b(input: String): Int = {
    val seats: Array[Array[Boolean]] = Array.ofDim[Boolean](128, 8)

    input
      .split("\n")
      .foreach(boardingPass => {
        val (row, col) = Question5.parsePassToRowAndCol(boardingPass)
        seats(row)(col) = true
      })

    val row = seats.indexWhere(row => {
      val population = row.filter((seat) => seat).length
      population != 8 && population != 0
    })
    val col = seats(row).indexWhere(seat => !seat);
    (row * 8) + col
  }

  def question6a(input: String): Int = {
    input
      .split("\n\n")
      .map(group => group.replace("\n", "").split("").toSet.size)
      .reduce((a, b) => a + b)
  }

  def question6b(input: String): Int = {
    val groups = input.split("\n\n")
    Question6.parseGroups(groups, 0)
  }

  def question7a(input: String): Int = {
    val rules = input.split("\n").map(line => BagRule(line))

    val innerBags = Array("shiny gold")
    Question7.countOuterBags(innerBags, rules, 0)
  }

  def question7b(input: String): Int = {
    val rules = input.split("\n").map(line => BagRule(line))

    Question7.countBagsIn("shiny gold", rules)
  }

  def question8a(input: String): Int = {
    val instructions = input.split("\n");

    Question8.processBootCode(instructions)
  }

  def question8b(input: String): Int = {
    val instructions = input.split("\n");

    Question8.processPatchedBootCode(instructions).getOrElse(-1)
  }

  def question9a(input: String): Long = {
    val packages = input.split("\n").map(pack => pack.toLong)
    Question9.findFirstNonSum(packages, 5)
  }
  def question9b(input: String): Long = {
    val packages = input.split("\n").map(pack => pack.toLong)
    Question9.findContiguousSet(packages, 25)
  }
}
