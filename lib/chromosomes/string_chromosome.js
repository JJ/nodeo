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
}
