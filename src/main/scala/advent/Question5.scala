package advent

object Question5 {
  def parsePassToRowAndCol(boardingPass: String): (Int, Int) = {
    val row = Integer.parseInt(
      boardingPass
        .slice(0, 7)
        .replaceAll("F", "0")
        .replaceAll("B", "1"),
      2
    )
    val col = Integer.parseInt(
      boardingPass
        .slice(7, 11)
        .replaceAll("L", "0")
        .replaceAll("R", "1"),
      2
    )
    (row, col)
  }
}
