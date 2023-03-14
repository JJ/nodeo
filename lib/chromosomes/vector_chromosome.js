/**
 * Inmutable string chromosome class for NodEO
 *
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

import { Chromosome } from "../api/chromosome.js";
import { ABTException } from "../abt_exception.js";

export class VectorChromosome extends Chromosome {
  /**
   *
   * @param {*} aVector the values of the chromosome
   * @param {*} fitness the computed value of the fitness
   */
  constructor(aVector, fitness = 0) {
    if (new.target === VectorChromosome) {
      throw new ABTException("VectorChromosome");
    }
    super(fitness);
    this.vector = aVector;
  }

  /**
   *
   * @param { VectorChromosome } chrom1 - first chromosome, must have this API
   * @param { VectorChromosome } chrom2 - second, also with this API
   * @returns { Array } an array with two elements, with the two new chromosomes
   */
  static crossover(chrom1, chrom2) {
    const length = chrom1.vector.length;
    const xover_point = Math.floor(Math.random() * length);
    const range = 1 + Math.floor(Math.random() * (length - xover_point));
    let new_chrom1 = [...chrom1.vector];
    let new_chrom2 = [...chrom2.vector];
    new_chrom1.splice(
      xover_point,
      range,
      ...new_chrom2.slice(xover_point, xover_point + range)
    );
    new_chrom2.splice(
      xover_point,
      range,
      ...chrom1.vector.slice(xover_point, xover_point + range)
    );
    return [new_chrom1, new_chrom2];
  }
}
