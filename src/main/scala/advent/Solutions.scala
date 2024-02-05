package advent

import scala.annotation.tailrec
import advent.shapes.PasswordRuleset

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
      .map(line => {
        val segments = line.split(" ");
        if (segments.length != 3) {
          throw new Error(
            s"Line invalid length, expected 3 segments but got ${segments.length}, '${line}'"
          )
        }

        val minMax = segments(0).split("-").map(num => num.toInt)
        val char = segments(1).replace(":", "")

        new PasswordRuleset(minMax(0), minMax(1), char, segments(2))
      })
      .filter(ruleset => ruleset.isValidA())
      .length
  }

  def question2b(input: String): Int = {
    input
      .split("\n")
      .map(line => {
        val segments = line.split(" ");
        if (segments.length != 3) {
          throw new Error(
            s"Line invalid length, expected 3 segments but got ${segments.length}, '${line}'"
          )
        }

        val minMax = segments(0).split("-").map(num => num.toInt)
        val char = segments(1).replace(":", "")

        new PasswordRuleset(minMax(0), minMax(1), char, segments(2))
      })
      .filter(ruleset => ruleset.isValidB())
      .length
  }

  def question3a(input: String): Int = {
    val lines = input.split("\n")
    Question3.traverseArea(0, lines, 0, 3, 1)
  }

  def question3b(input: String): Long = {
    val lines = input.split("\n")
    val treesHit = Array(
      Array(1, 1),
      Array(3, 1),
      Array(5, 1),
      Array(7, 1),
      Array(1, 2)
    )
      .map(rightDown => {
        Question3.traverseArea(0, lines, 0, rightDown(0), rightDown(1))
      })
      .map(int => int.toLong)
    val str = treesHit.map(hit => s"$hit").reduce((a, b) => s"$a $b")
    println(str)
    treesHit
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
}
