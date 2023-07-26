import { test } from "tap";
import { StringChromosome } from "../../lib/chromosomes/string_chromosome.js";
import _ from "lodash";

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
    manyChromosomes.forEach((c) => {
      t.equal(c.length, l);
      const fakeChrom = { stringChr: c };
      t.notSame(c, StringChromosome.mutate(fakeChrom));
    });

    const pairs = _.zip(
      manyChromosomes.slice(0, NUMBER_OF_CHROMOSOMES / 2),
      manyChromosomes.slice(NUMBER_OF_CHROMOSOMES / 2)
    );
    let diffCrossed = 0;
    pairs.forEach((p) => {
      const chrom1 = { stringChr: p[0] };
      const chrom2 = { stringChr: p[1] };
      const crossed = StringChromosome.crossover(chrom1, chrom2);
      if (crossed[0] !== p[0]) {
        diffCrossed++;
      }
    });
    t.ok(diffCrossed > 1);
  });
  t.end();
});
