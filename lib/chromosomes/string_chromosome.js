/**
 * Inmutable string chromosome class for NodEO
 *
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

import { Chromosome } from "../api/chromosome";
import { randomBytes } from "node:crypto";
import { range } from "lodash";

class StringChromosome extends Chromosome {
  constructor(aString, fitness) {
    super(fitness);
    this.stringChr = aString;
  }

  static factory(numberOfChromosomes, config) {
    const bytes = Math.ceil(config.length / 8);
    let chromosomes = [];
    range(numberOfChromosomes).forEach((_) => {
      chromosomes.push(
        randomBytes(bytes).toString(2).substring(0, config.length)
      );
    });
    return chromosomes;
  }
}
