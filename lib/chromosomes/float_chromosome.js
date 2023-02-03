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

export class FloatChromosome extends Chromosome {
  constructor(aVector, fitness) {
    super(fitness);
    this.vectorChr = aVector;
  }

  static factory(numberOfChromosomes, config) {
    let chromosomes = [];
    _.range(numberOfChromosomes).forEach(() => {
      const random_ints = getRandomValues(new Uint32Array(config.length));

      chromosomes.push(
        random_ints.map(
          (e) =>
            ((e * 1.0) / Number.MAX_SAFE_INTEGER) * (config.max - config.min) -
            config.min
        )
      );
    });
    return chromosomes;
  }
}
