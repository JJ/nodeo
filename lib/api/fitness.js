// Base class for fitness functions
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

import { ABTException } from "../abt_exception.js";
import _ from "lodash";

export class Fitness {
  constructor() {
    this.apply = _.memoize(this.apply);

    if (new.target === Fitness) {
      throw new ABTException("Fitness");
    }
  }

  apply(chromosome) {
    throw new ABTException(`Fitness with ${chromosome}`);
  }
}
