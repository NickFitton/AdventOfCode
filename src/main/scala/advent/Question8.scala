package advent

import advent.shapes.BagRule
import scala.annotation.tailrec

object Question8 {
  @tailrec
  def countOuterBags(
      innerBags: Array[String],
      rules: Array[BagRule],
      count: Int
  ): Int = {
    val groups = rules.groupBy[String](rule => {
      val indexOfMatchingChild = rule.children
        .indexWhere((childBag) => innerBags.contains(childBag._2))

      if (indexOfMatchingChild != -1) "parent"
      else "other"
    })

    if (!groups.contains("parent")) {
      return count
    }
    val newInnerBags = groups("parent").map(rule => rule.color)
    val newRules = groups("other")
    val newCount = count + newInnerBags.length
    countOuterBags(newInnerBags, newRules, newCount)
  }

  def countBagsIn(bagColor: String, rules: Array[BagRule]): Int = {
    println(s"counting bags in $bagColor")
    // Find this bags rule
    val bagsRule = rules
      .find((rule) => rule.color == bagColor)

    if (bagsRule.isEmpty) {
      throw new Error(s"No rule found for bag color $bagColor")
    }

    if (bagsRule.get.children.isEmpty) {
      println(s"$bagColor contains no other bags.")
      return 0
    }

    val bagsInSelf =
      bagsRule.get.children.map((count, _) => count).reduce((a, b) => a + b)
    // Get the number of bags in each child
    val bagsInEach = bagsRule.get.children.map(child => {
      val count = child._1
      val color = child._2
      val bagsInBag = countBagsIn(color, rules)
      println(s"$color => $bagsInBag * $count")
      bagsInBag * count
    })

    // If there's no child bags
    if (bagsInEach.isEmpty) {
      return bagsInSelf
    }

    // Else sum the bags in the child
    return bagsInSelf + bagsInEach.reduce((a, b) => a + b)
  }
}
