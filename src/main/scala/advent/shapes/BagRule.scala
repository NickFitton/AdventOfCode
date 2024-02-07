package advent.shapes

import scala.util.matching.Regex

val parentBag: Regex = "^[a-z]+ [a-z]+".r
val childBag: Regex = "([0-9]+) ([a-z]+ [a-z]+) bags?[.,]".r

class BagRule(rawRule: String) {
  val color = parentBag.findFirstIn(rawRule) match {
    case Some(x) => x
    case None =>
      throw new Error(s"Something went wrong parsing a bag '$rawRule'")
  }

  val children =
    childBag
      .findAllMatchIn(rawRule)
      .map(matches => {
        val count = matches.group(1).toInt
        val color = matches.group(2)
        (count, color)
      })
      .toArray
}
