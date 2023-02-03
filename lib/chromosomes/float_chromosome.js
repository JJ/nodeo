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
const BIG32BITINTASFLOAT = 4294967296.0;
export class FloatChromosome extends Chromosome {
  constructor(aVector, fitness) {
    super(fitness);
    this.vectorChr = aVector;
  }

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
}
