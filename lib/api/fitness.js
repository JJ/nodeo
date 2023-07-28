// Base class for fitness functions
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

import { ABCException } from "../abc_exception.js";
import _ from "lodash";

export class Fitness {
  constructor() {
    this.apply = _.memoize(this.apply);

    if (new.target === Fitness) {
      throw new ABCException("Fitness");
    }
  }

  apply(chromosome) {
    console.warn("Will not get here with " + chromosome);
  }
}
