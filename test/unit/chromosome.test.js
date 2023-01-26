import { test } from "tap";
import { StringChromosome } from "../../lib/chromosomes/string_chromosome.js";
import { FloatChromosome } from "../../lib/chromosomes/float_chromosome.js";

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

test("Generating float chromosome", (t) => {
  const DIMENSION = 10;
  const MIN = 0.0;
  const MAX = 1.0;
  const floatChromosome = FloatChromosome.factory(NUMBER_OF_CHROMOSOMES, {
    length: DIMENSION,
    max: MAX,
    min: MIN,
  });
  t.equal(
    floatChromosome.length,
    NUMBER_OF_CHROMOSOMES,
    "Generated as many chromosomes as requested"
  );
  t.equal(floatChromosome[0].length, DIMENSION);
  console.log(floatChromosome);
  t.ok(floatChromosome[0].vectorChr[0] > MIN, "Within bounds");
  t.ok(floatChromosome[0].vectorChr[0] < MAX, "Within bounds");
  t.end();
});
