/**
 * Inmutable string chromosome class for NodEO
 *
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

import { Chromosome } from "../api/chromosome.js";
import { randomBytes } from "node:crypto";
import _ from "lodash";

export class StringChromosome extends Chromosome {
  constructor(aString, fitness) {
    super(fitness);
    this.stringChr = aString;
  }

  static factory(numberOfChromosomes, config) {
    const bytes = Math.ceil(config.length / 8);
    let chromosomes = [];
    _.range(numberOfChromosomes).forEach(() => {
      chromosomes.push(
        randomBytes(bytes)
          .reduce((acc, byte) => (acc += byte.toString(2).padStart(8, "0")), "")
          .substring(0, config.length)
      );
    });
    return chromosomes;
  }

  /**
   * @param {Array} stringChr - The chromosome part of what you want mutated
   */
  static mutate({ stringChr }) {
    const mutation_point = Math.floor(Math.random() * stringChr.length);
    let temp =
      stringChr.substring(0, mutation_point) + stringChr[mutation_point] == "0"
        ? "1"
        : "0" + stringChr.substring(mutation_point + 1);
    return temp;
  }
}
