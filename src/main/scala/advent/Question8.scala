package advent

import scala.annotation.tailrec

object Question8 {
  @tailrec
  def processBootCode(bootCode: Array[String], pointer: Int = 0, processed: Array[Int] = Array(), value: Int = 0): Int = {
    if (pointer >= bootCode.length || processed.contains(pointer)) {
      return value
    }

    val (operation, number) = getInstruction(bootCode, pointer)
    operation match
      case "nop" => processBootCode(bootCode, pointer + 1, processed.+:(pointer), value)
      case "acc" => processBootCode(bootCode, pointer + 1, processed.+:(pointer), value + number)
      case "jmp" => processBootCode(bootCode, pointer + number, processed.+:(pointer), value)
      case _ => throw new Error(s"pointer at bad index $pointer")
  }

  def processPatchedBootCode(bootCode: Array[String], pointer: Int = 0, processed: Array[Int] = Array(), value: Int = 0, patchUsed: Boolean = false): Option[Int] = {
    if (pointer == bootCode.length) {
      return Option.apply(value)
    } else if (pointer > bootCode.length || processed.contains(pointer)) {
      return Option.empty
    }

    val instruction = bootCode(pointer)
    val parts = instruction.split(" ")
    val (operation, number) = getInstruction(bootCode, pointer)

    operation match
      case "nop" => {
        if (patchUsed) {
          return processPatchedBootCode(bootCode, pointer + 1, processed.+:(pointer), value, patchUsed)
        }
        return processPatchedBootCode(bootCode, pointer + 1, processed.+:(pointer), value, patchUsed)
          .orElse(processPatchedBootCode(bootCode, pointer + number, processed.+:(pointer), value, true))
      }
      case "jmp" => {
        if (patchUsed) {
          return processPatchedBootCode(bootCode, pointer + number, processed.+:(pointer), value, patchUsed)
        }
        return processPatchedBootCode(bootCode, pointer + number, processed.+:(pointer), value, patchUsed)
          .orElse(processPatchedBootCode(bootCode, pointer + 1, processed.+:(pointer), value, true))
      }
      case "acc" => processPatchedBootCode(bootCode, pointer + 1, processed.+:(pointer), value + number, patchUsed)
      case _ => throw new Error(s"pointer at bad index $pointer")
  }

  def getInstruction(bootCode: Array[String], pointer: Int = 0): (String, Int) = {
    val parts = bootCode(pointer).split(" ")
    ( parts(0), parts(1).toInt )
  }
}
