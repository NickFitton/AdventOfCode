package advent

import scala.annotation.tailrec

object Question3 {
  @tailrec
  def traverseArea(
      position: Int,
      area: Array[String],
      agg: Int,
      right: Int,
      down: Int
  ): Int = {
    if (area.length == 0) {
      return agg
    }
    if (area(0).charAt(position).toString.equals("#")) {
      return traverseArea(
        (position + right) % area(0).length,
        area.slice(down, area.length),
        agg + 1,
        right,
        down
      )
    }
    return traverseArea(
      (position + right) % area(0).length,
      area.slice(down, area.length),
      agg,
      right,
      down
    )
  }
}
