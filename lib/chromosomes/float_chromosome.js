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
import { stat } from "node:fs";
const BIG32BITINTASFLOAT = 4294967296.0;
export class FloatChromosome extends Chromosome {
  constructor(aVector, fitness = 0) {
    super(fitness);
    this.floatVector = aVector;
  }
  static mutationRange = 0.2;

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
   * @param {Array} floatVector - The chromosome part of what you want mutated
   */
  static mutate({ floatVector }) {
    if (floatVector === undefined) {
      throw new Error("Incorrect data structure: no floatVector attribute");
    }
    const mutation_point = Math.floor(Math.random() * floatVector.length);
    let temp = [...floatVector];
    temp[mutation_point] =
      temp[mutation_point] -
      this.mutationRange / 2 +
      Math.random() * this.mutationRange;
    return temp;
  }
}
