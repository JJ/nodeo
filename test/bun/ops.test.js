import { expect, test } from "bun:test";

import { StringChromosome } from "../../lib/chromosomes/string_chromosome.js";
import { evaluation } from "../../lib/population_ops.js";
import { LTrapFitness } from "../../lib/fitness/index.js";

const NUMBER_OF_CHROMOSOMES = 32;
const CHROMOSOME_LENGTH = 64;

const manyChromosomeStrings = StringChromosome.factory(NUMBER_OF_CHROMOSOMES, {
  length: CHROMOSOME_LENGTH,
});

const ltrap = new LTrapFitness();
const manyChromosomes = evaluation(
  StringChromosome,
  manyChromosomeStrings,
  ltrap.apply
);

console.log(manyChromosomes);
