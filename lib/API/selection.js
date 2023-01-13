// Selection mechanisms plus common code if needed
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

import { ABTException } from "../abt_exception.js";

export class Selection {
  constructor() {
    throw new ABTException("Selection");
  }

  select(population) {
    throw new ABTException(`Selection with ${population}`);
  }
}
