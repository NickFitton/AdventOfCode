package advent

import scala.util.matching.Regex
val attributes = Array("byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid")
val heightTypes = Array("in", "cm")
val rgbRegex: Regex = "^#[0-9a-f]{6}$".r
val eyeColors = Array("amb", "blu", "brn", "gry", "grn", "hzl", "oth")
val pidRegex: Regex = "^[0-9]{9}$".r

object Question4 {
  def passportIsValid(passport: String): Boolean = {
    val foundMissing = attributes.indexWhere((attribute) => {
      passport.indexOf(attribute + ":") == -1
    })
    foundMissing == -1
  }

  def passportIsMoreValid(passport: String): Boolean = {
    if (!passportIsValid(passport)) {
      // println(s"Passport invalid: missing attributes")
      return false
    }

    val kv = passport.split(" ");

    val byr = findAttr(kv, "byr").toInt
    if (byr < 1920 || byr > 2002) {
      // println(s"Passport invalid: bad byr")
      return false
    }

    val iyr = findAttr(kv, "iyr").toInt
    if (iyr < 2010 || iyr > 2020) {
      // println(s"Passport invalid: bad iyr")
      return false
    }

    val eyr = findAttr(kv, "eyr").toInt
    if (eyr < 2020 || eyr > 2030) {
      // println(s"Passport invalid: bad eyr")
      return false
    }

    val hgt = findAttr(kv, "hgt")
    val typePos = heightTypes.indexWhere((tipe) => hgt.contains(tipe))
    if (typePos == -1) {
      // println(s"Passport invalid: bad hgt type")
      return false
    }
    if (hgt.contains("cm")) {
      val rawHgt = hgt.replace("cm", "").toInt
      if (rawHgt < 150 || rawHgt > 193) {
        // println(s"Passport invalid: bad hgt")
        return false
      }
    } else {
      val rawHgt = hgt.replace("in", "").toInt
      if (rawHgt < 59 || rawHgt > 76) {
        // println(s"Passport invalid: bad hgt")
        return false
      }
    }

    val hcl = findAttr(kv, "hcl")
    if (!rgbRegex.matches(hcl)) {
      // println(s"Passport invalid: bad hcl")
      return false
    }

    val ecl = findAttr(kv, "ecl")
    if (eyeColors.indexWhere(color => ecl == color) == -1) {
      // println(s"Passport invalid: bad ecl")
      return false
    }

    val pid = findAttr(kv, "pid")
    if (!pidRegex.matches(pid)) {
      // println(s"Passport invalid: bad pid")
      return false
    }
    return true
  }

  def findAttr(kv: Array[String], attribute: String): String = {
    val optPair = kv.find(pair => pair.contains(attribute))
    if (optPair.isEmpty) {
      throw new Error(s"Validated but key is missing, $attribute")
    }
    optPair.get.split(":")(1)
  }
}
