// Operators abstract base class
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

import { ABCException } from "../abc_exception.js";

export class Mutator {
  constructor() {
    if (new.target === Mutator) {
      throw new ABCException("Mutator");
    }
  }

  mutate(args) {
    console.warn("Will not get here with " + args);
  }
}

export class Crossover {
  constructor() {
    if (new.target === Crossover) {
      throw new ABCException("Crossover");
    }
  }

  cross(args) {
    console.warn("Will not get here with " + args);
  }
}
