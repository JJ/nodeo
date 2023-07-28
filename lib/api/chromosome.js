// Chromosome abstract base class
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

import { ABCException } from "../abc_exception.js";

export class Chromosome {
  #fitness;
  constructor(fitness) {
    if (new.target === Chromosome) {
      throw new ABCException("Chromosome");
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
