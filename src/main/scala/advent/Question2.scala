package advent

import advent.shapes.PasswordRuleset

object Question2 {
  def parseLineAsRuleSet(line: String): PasswordRuleset = {
    val segments = line.split(" ");
    if (segments.length != 3) {
      throw new Error(
        s"Line invalid length, expected 3 segments but got ${segments.length}, '${line}'"
      )
    }

    val minMax = segments(0).split("-").map(num => num.toInt)
    val char = segments(1).replace(":", "")

    new PasswordRuleset(minMax(0), minMax(1), char, segments(2))
  }
}
