/**
 * Inmutable string chromosome class for NodEO
 *
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

import { Chromosome } from "../api/chromosome.js";
import { getRandomValues } from "node:crypto";
import _ from "lodash";

export class VectorChromosome extends Chromosome {
  /**
   * @param { Array } aVector            - Vector of values to initialize the chromosome
   * @param { Function } atomicMutator - Changes a single element
   * @param { Number }   fitness       - Fitness value
   */
  constructor(aVector, atomicMutator, fitness = 0) {
    super(fitness);
    this.vector = aVector;
    this.atomicMutator = atomicMutator;
  }

  /**
   * @param {Number} numberOfChromosomes - How many {{FloatChromosomes}} you want
   * @param { Object } config
   * @param { Number } config.length Length of every chromosomes, number of "genes"
   * @param { Number } config.min    Left-hand side of the range
   * @param { Number } config.max    Right-hand side of the range
   */
  static factory(numberOfChromosomes, config) {
    let chromosomes = [];
    _.range(numberOfChromosomes).forEach(() => {
      const randomInts = getRandomValues(new Uint32Array(config.length));
      let newArray = [];
      randomInts.forEach((e) => {
        newArray.push(
          (e / BIG32BITINTASFLOAT) * (config.max - config.min) - config.min
        );
      });
      chromosomes.push(newArray);
    });
    return chromosomes;
  }

  /**
   * @param {Array} vectorChr - The chromosome part of what you want mutated
   */
  static mutate({ vectorChr }) {
    const mutation_point = Math.floor(Math.random() * vectorChr.length);
    let temp = [...vectorChr];
    temp[mutation_point] = temp[mutation_point] - 0.2 + Math.random() * 0.1;
    return temp;
  }
}
