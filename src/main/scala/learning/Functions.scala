package learning

object Functions {
  def concat(a: String, b: Int): String = {
    a + " " + b
  }

  def aParameterlessFunction(): Int = 42

  // Can be called with empty brackets
  println(aParameterlessFunction())

  def aRepeatedFunction(aString: String, n: Int): String = {
    if (n == 1) aString
    else aString + aRepeatedFunction(aString, n - 1)
  }

  println(aRepeatedFunction("hello", 3))

  // WHen you need loops, use recursion
}
