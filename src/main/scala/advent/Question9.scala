package advent

import scala.annotation.tailrec

class Window(var seed: Array[Long]) {
  var preamble = seed
    .slice(1, seed.length)
    .zipWithIndex
    .map((elem, i) => seed.slice(0, i + 1).map(p => elem + p))

  override def toString(): String =
    preamble.map(i => i.mkString("\t")).mkString("\n")

  def hasNext(next: Long): Boolean = {
    preamble.find(sums => sums.find((sum) => sum == next).isDefined).isDefined
  }

  def applyNext(next: Long): Unit = {
    val newSums = seed.slice(1, seed.length).map(wind => wind + next)
    seed = seed.slice(1, seed.length) :+ next
    preamble = preamble
      .slice(1, preamble.length)
      .map(sums => sums.slice(1, sums.length)) :+ newSums
  }
}

class SumWindow(var seed: Array[Long]) {
  var sum = seed.reduce((a, b) => a + b)

  def sumsTo(number: Long): Boolean = sum == number

  /** Takes the given number and removes first numbers until under or eq to the
    * given sum
    */
  def takeUntilUnder(number: Long, target: Long): Unit = {
    seed = seed.appended(number)
    sum += number
    while (sum > target && !seed.isEmpty) {
      val removing = seed(0)
      sum -= removing
      seed = seed.slice(1, seed.length)
    }
  }
}

object Question9 {
  def findFirstNonSum(packages: Array[Long], preambleSize: Int): Long = {
    val preambleSet = packages.slice(0, preambleSize)
    val window = new Window(preambleSet);

    val rest = packages.slice(preambleSize, packages.length)

    nextNonSum(rest, window).getOrElse(-1)
  }

  def findContiguousSet(packages: Array[Long], preambleSize: Int): Long = {
    val preambleSet = packages.slice(0, preambleSize)
    val window = new Window(preambleSet);

    val rest = packages.slice(preambleSize, packages.length)

    val firstNonSum =
      nextNonSum(rest, window).getOrElse(throw new Error("No skipped number"))

    val sumWindow = new SumWindow(Array(packages(0)))

    val range =
      findSumRange(sumWindow, packages.slice(1, packages.length), firstNonSum)

    val min = range.seed.reduce((a, b) => if (a < b) a else b)
    val max = range.seed.reduce((a, b) => if (a < b) b else a)
    return min + max
  }

  @tailrec
  def nextNonSum(packages: Array[Long], window: Window): Option[Long] = {
    if (packages.isEmpty) {
      return Option.empty
    }

    val next = packages(0)

    if (!window.hasNext(next)) {
      return Option.apply(next)
    }

    window.applyNext(next)
    nextNonSum(packages.slice(1, packages.length), window)
  }

  @tailrec
  def findSumRange(
      sumWindow: SumWindow,
      packages: Array[Long],
      target: Long
  ): SumWindow = {
    if (packages.isEmpty) {
      throw new Error("Exhausted packages")
    }

    sumWindow.takeUntilUnder(packages(0), target)

    if (sumWindow.sumsTo(target)) sumWindow
    else findSumRange(sumWindow, packages.slice(1, packages.length), target)
  }

}
