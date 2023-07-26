import _ from "lodash";
import { test } from "tap";
import { StringChromosome } from "../../lib/chromosomes/string_chromosome.js";

const NUMBER_OF_CHROMOSOMES = 32;

test("Generating binary string chromosomes", (t) => {
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
