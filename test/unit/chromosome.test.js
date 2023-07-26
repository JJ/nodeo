import _ from "lodash";
import { test } from "tap";
import { FloatChromosome } from "../../lib/chromosomes/float_chromosome.js";
import { VectorChromosome } from "../../lib/chromosomes/vector_chromosome.js";

const NUMBER_OF_CHROMOSOMES = 32;

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
const aLength = 10;
const dummyArrays = ["a", "b"].map((l) => l.repeat(aLength).split(""));
const dummies = dummyArrays.map((a) => new DummyChromosome(a));
const dummySets = hashUnion(dummyArrays[0], dummyArrays[1]);
console.log(dummySets);
test("Checking vector-arranged chromosomes", (t) => {
  t.equal(dummies[0].vector.length, dummies[1].vector.length);
  const [result_1, result_2] = VectorChromosome.crossover(
    dummies[0],
    dummies[1]
  );
  t.equal(result_1.length, result_2.length);
  t.equal(result_1.length, dummies[0].vector.length);
  t.equal(result_2.length, dummies[1].vector.length);
  const resultSet = hashUnion(result_1, result_2);
  t.same(resultSet, dummySets);
  t.end();
});

function hashUnion(array1, array2) {
  const resultsSet1 = _.countBy(array1);
  const resultsSet2 = _.countBy(array2);
  const keys = new Set([..._.keys(resultsSet1), ..._.keys(resultsSet2)]);
  let resultsSet = {};
  for (let i of keys) {
    resultsSet[i] = valueOrZero(resultsSet1, i) + valueOrZero(resultsSet2, i);
  }
  return resultsSet;
}

function valueOrZero(hash, key) {
  return key in hash ? hash[key] : 0;
}
