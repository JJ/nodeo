import _ from "lodash";

/** Returns statistics over the population, by running over the (scalar) fitness values
  @param { Array } population - an array of objects with the `fitness` property, which should be a scalar
*/
export function stats(population) {
  console.log(population);
  const fitnesses = population.map((c) => c.fitness);
  return {
    mean: _.mean(fitnesses),
    max: _.max(fitnesses),
    min: _.min(fitnesses),
  };
}
