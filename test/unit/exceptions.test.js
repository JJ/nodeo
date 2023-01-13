import { ABTException } from "../../lib/abt_exception.js";
import { Selection } from "../../lib/api/selection.js";
import { Fitness } from "../../lib/api/fitness.js";
import { test } from "tap";

class Foo {
  constructor() {
    throw new ABTException("Foo");
  }
}

test("Exception works as expected", function (t) {
  [Foo, Selection].map((aClass) => {
    t.throws(function () {
      new aClass();
    }, ABTException);
  });

  t.throws(function () {
    new Selection();
  }, ABTException);
  t.throws(function () {
    new Fitness();
  }, ABTException);
  t.end();
});
