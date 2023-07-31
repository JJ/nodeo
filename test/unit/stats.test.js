import { test } from "tap";
import { stats } from "../../lib/stats.js";
import { StringChromosome } from "../../lib/chromosomes/string_chromosome.js";

const fitnesses = [0, 0, 1, 1];
test("Testing stats", (t) => {
  const chromosomes = fitnesses.map((f) => new StringChromosome("", f));
  const theseStats = stats(chromosomes);
  t.ok(theseStats.min === 0);
  t.ok(theseStats.max === 1);
  t.ok(theseStats.mean === 0.5);
  t.end();
});
