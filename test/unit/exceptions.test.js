import { ABCException } from "../../lib/abc_exception.js";
import { Selection } from "../../lib/api/selection.js";
import { Fitness } from "../../lib/api/fitness.js";
import { Chromosome } from "../../lib/api/chromosome.js";
import { Mutator, Crossover } from "../../lib/api/operators.js";
import { VectorChromosome } from "../../lib/chromosomes/vector_chromosome.js";

import { test } from "tap";

class Foo {
  constructor() {
    throw new ABCException("Foo");
  }
}

test("Exceptions work as expected", function (t) {
  [
    Foo,
    Selection,
    Fitness,
    Chromosome,
    Mutator,
    Crossover,
    VectorChromosome,
  ].map((aClass) => {
    t.throws(function () {
      new aClass();
    }, ABCException);
  });

  t.end();
});
