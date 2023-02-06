/**
 * Converts a raw array of the data structures used for chromosomes in an array of chromosomes
 *
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */
export function chromosomeArrayGenerator(
  rawChromosomeArray,
  fitnessFunction,
  chromosomeType
) {
  let population = [];
  rawChromosomeArray.forEach((element) => {
    population.push(
      new chromosomeType(element, fitnessFunction.apply(element))
    );
  });
  return population;
}
