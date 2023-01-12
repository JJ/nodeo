import { ABTException } from "../../lib/ABTException.js";
import { test } from "tap";

class Foo {
  constructor() {
    throw new ABTException(Foo);
  }
}

test("Exception works as expected", function (t) {
  t.throws(function () {
    new Foo();
  }, ABTException);
  t.end();
});
