// Operators abstract base class
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

import { ABTException } from "../abt_exception.js";

export class Mutator {
  constructor() {
    if (new.target === Mutator) {
      throw new ABTException("Mutator");
    }
  }

  mutate(args) {
    console.warn("Will not get here with " + args);
  }
}

export class Crossover {
  constructor() {
    if (new.target === Crossover) {
      throw new ABTException("Crossover");
    }
  }

  cross(args) {
    console.warn("Will not get here with " + args);
  }
}
