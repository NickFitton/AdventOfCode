package testable

class TestableTests extends munit.FunSuite {
  test("'concat' should handle empty strings") {
    val result = Testable.concat("String 1", "");
    assertEquals(result, "String 1")
  }
}
