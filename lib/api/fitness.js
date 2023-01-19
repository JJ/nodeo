// Selection mechanisms plus common code if needed
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

import { ABTException } from "../abt_exception.js";

export class Fitness {
  constructor() {
    if (new.target === Fitness) {
      throw new ABTException("Fitness");
    }
  }

  apply(chromosome) {
    throw new ABTException(`Fitness with ${chromosome}`);
  }
}
