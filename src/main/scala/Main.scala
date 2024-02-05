import advent.Solutions
import scala.io.Source

@main def hello(): Unit =
  val input = Source.fromResource("input.txt").mkString

  val result = Solutions.question4b(input)
  println(result)

