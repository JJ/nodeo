import { test } from "tap";
import { StringChromosome } from "../../lib/chromosomes/string_chromosome.js";
import { FloatChromosome } from "../../lib/chromosomes/float_chromosome.js";
import { VectorChromosome } from "../../lib/chromosomes/any_chromosome.js";

const NUMBER_OF_CHROMOSOMES = 32;

test("Generating string chromosomes", (t) => {
  [20, 64].forEach((l) => {
    const manyChromosomes = StringChromosome.factory(NUMBER_OF_CHROMOSOMES, {
      length: l,
    });
    t.equal(
      manyChromosomes.length,
      NUMBER_OF_CHROMOSOMES,
      "Generated as many chromosomes as requested"
    );
    t.equal(manyChromosomes[0].length, l);
  });
  t.end();
});

test("Fitness needs to be defined ", (t) => {
  t.throws(() => {
    new FloatChromosome([1], null);
  }, "Throws with null fitness");
  t.end();
});

test("Generating float chromosome", (t) => {
  const DIMENSION = 10;
  const MIN = 0.0;
  const MAX = 1.0;
  const floatChromosomes = FloatChromosome.factory(NUMBER_OF_CHROMOSOMES, {
    length: DIMENSION,
    max: MAX,
    min: MIN,
  });
  t.equal(
    floatChromosomes.length,
    NUMBER_OF_CHROMOSOMES,
    "Generated as many chromosomes as requested"
  );
  floatChromosomes.forEach((fc) => {
    t.equal(fc.length, DIMENSION);
    t.ok(fc[0] > MIN, "Within bounds - left");
    t.ok(fc[0] < MAX, "Within bounds - right");
    const aChromosome = new FloatChromosome(fc);
    const newChromosome = FloatChromosome.mutate(aChromosome);
    t.notSame(newChromosome, fc.vectorChr, "Mutation works");
  });

  t.end();
});

class DummyChromosome extends VectorChromosome {}
const dummies = [
  new DummyChromosome("aaaaaaaaa".split("")),
  new DummyChromosome("bbbbbbbbb".split("")),
];
test("Checking vector-arranged chromosomes", (t) => {
  t.equal(dummies[0].vector.length, dummies[1].vector.length);
  t.end();
});
