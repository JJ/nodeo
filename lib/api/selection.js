// Selection mechanisms plus common code if needed
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

import { ABCException } from "../abc_exception.js";

export class Selection {
  constructor() {
    throw new ABCException("Selection");
  }

  apply(population) {
    console.warn(`will not get here with ${population}`);
  }
}
