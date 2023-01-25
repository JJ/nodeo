// Chromosome abstract base class
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

import { ABTException } from "../abt_exception.js";

export class Chromosome {
  constructor(fitness) {
    if (new.target === Chromosome) {
      throw new ABTException("Fitness");
    }
    this.fitness = fitness;
  }

  get fitness() {
    return this.fitness;
  }
}
