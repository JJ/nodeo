import { ABTException } from "../../lib/abt_exception.js";
import { Selection } from "../../lib/api/selection.js";
import { Fitness } from "../../lib/api/fitness.js";
import { Chromosome } from "../../lib/api/chromosome.js";

import { test } from "tap";

class Foo {
  constructor() {
    throw new ABTException("Foo");
  }
}

test("Exceptions work as expected", function (t) {
  [Foo, Selection, Fitness, Chromosome].map((aClass) => {
    t.throws(function () {
      new aClass();
    }, ABTException);
  });

  t.end();
});
