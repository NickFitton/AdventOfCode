package advent

import scala.annotation.tailrec

object Question1 {

  def findSumsTo2020(first: Int, rest: Array[Int]): Array[Int] = {
    println(first + "\t" + rest.length)
    if (rest.isEmpty) {
      return Array[Int]()
    }
    val pair = rest.find(num => first + num == 2020)
    if (pair.isDefined) {
      return Array(first, pair.get)
    } else {
      return findSumsTo2020(rest(0), rest.slice(1, rest.length))
    }
  }

  @tailrec
  def firstDepth(first: Int, rest: Array[Int]): Option[Array[Int]] = {
    if (rest.isEmpty) {
      return Option.empty[Array[Int]]
    }

    val trio = secondDepth(first, rest(0), rest.slice(1, rest.length))
    if (trio.isDefined) {
      return trio
    } else {
      return firstDepth(rest(0), rest.slice(1, rest.length))
    }
  }

  @tailrec
  def secondDepth(
      first: Int,
      second: Int,
      rest: Array[Int]
  ): Option[Array[Int]] = {
    if (rest.isEmpty) {
      return Option.empty[Array[Int]]
    }
    val pair = rest.find(num => first + second + num == 2020)
    if (pair.isDefined) {
      return Option.apply(Array(first, second, pair.get))
    } else {
      return secondDepth(first, rest(0), rest.slice(1, rest.length))
    }
  }
}
