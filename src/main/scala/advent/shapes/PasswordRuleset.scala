package advent.shapes

class PasswordRuleset(
    val min: Int,
    val max: Int,
    val char: String,
    var password: String
) {
  def isValidA(): Boolean = {
    val charCount =
      password
        .split("")
        .filter(passwordChar => passwordChar == char)
        .length
    charCount >= min && charCount <= max
  }

  def isValidB(): Boolean = {
    Array(min, max)
      .filter(position => password.charAt(position - 1).toString == char)
      .length == 1
  }
}
