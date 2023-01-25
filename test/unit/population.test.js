import { test } from "tap";
import { HIFFFitness } from "../../lib/fitness/HIFF.js";
import { StringChromosome } from "../../lib/chromosomes/string_chromosome.js";
import { Population } from "../../lib/population.js";

const NUMBER_OF_CHROMOSOMES = 32;
const thisFitness = new HIFFFitness();
test("Generating chromosomes", (t) => {
  const manyChromosomes = StringChromosome.factory(NUMBER_OF_CHROMOSOMES, {
    length: 32,
  });
  const population = new Population(
    manyChromosomes,
    thisFitness,
    StringChromosome
  );
  population.population.foreach((e) => t.ok(e.fitness, "Fitness computed "));
  t.end();
});
