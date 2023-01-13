import { ABTException } from "../../lib/abt_exception.js";
import { Selection } from "../../lib/API/selection.js";
import { test } from "tap";

class Foo {
  constructor() {
    throw new ABTException("Foo");
  }
}

test("Exception works as expected", function (t) {
  t.throws(function () {
    new Foo();
  }, ABTException);
  t.throws(function () {
    new Selection();
  }, ABTException);
  t.end();
});
