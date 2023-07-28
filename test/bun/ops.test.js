import { expect, test } from "bun:test";

import { StringChromosome } from "../../lib/chromosomes/string_chromosome.js";
import { Evaluation } from "../../lib/population_ops.js";
import { LTrapFitness } from "../../lib/fitness/index.js";
import { Tournament } from "../../lib/op/tournament.js";

const NUMBER_OF_CHROMOSOMES = 32;
const CHROMOSOME_LENGTH = 64;

const manyChromosomeStrings = StringChromosome.factory(NUMBER_OF_CHROMOSOMES, {
  length: CHROMOSOME_LENGTH,
});

const ltrap = new LTrapFitness();
const evaluation = new Evaluation((c) => ltrap.apply(c), StringChromosome);
const manyChromosomes = evaluation.apply(manyChromosomeStrings);
const selection = new Tournament(3, NUMBER_OF_CHROMOSOMES);

test("Evaluation with l-trap", function () {
  expect(manyChromosomes.length).toBe(NUMBER_OF_CHROMOSOMES);
  manyChromosomes.forEach((c) => {
    expect(c).toHaveProperty("fitness");
    expect(c).toHaveProperty("stringChr");
    expect(c.stringChr.length).toBe(CHROMOSOME_LENGTH);
    expect(ltrap.apply(c.stringChr)).toBe(c.fitness);
  });
});

test("tournament selection", function () {
  const newPopulation = selection.apply(manyChromosomes);
  expect(newPopulation.length).toBe(NUMBER_OF_CHROMOSOMES);
  newPopulation.forEach((c) => {
    expect(c).toHaveProperty("stringChr");
  });
});
