/**
 * Inmutable population class for NodEO
 *
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

export class Population {
  population;
  constructor(chromosome_array, fitness_function, chromosome_type) {
    this.population = [];
    chromosome_array.forEach((element) => {
      this.population.push(
        new chromosome_type(element, fitness_function.apply(element))
      );
    });
  }
  get population() {
    return this.population;
  }
}
