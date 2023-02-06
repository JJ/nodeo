// Chromosome abstract base class
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

import { ABTException } from "../abt_exception.js";

export class Chromosome {
  #fitness;
  constructor(fitness) {
    if (new.target === Chromosome) {
      throw new ABTException("Chromosome");
    }
    if (fitness === null || typeof fitness === "undefined") {
      throw new Error("Fitness in Chromosome needs to be defined");
    }
    this.#fitness = fitness;
  }

  get fitness() {
    return this.#fitness;
  }
}
