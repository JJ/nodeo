/**
 * Fitness functions for testing
 *
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 * @license GPL v3
 */

import { Fitness } from "../api/fitness.js";
import _ from "lodash";

const PI2 = 2 * Math.PI;
/*
  Ackley description in http://tracer.lcc.uma.es/problems/ackley/ackley.html
*/
export class AckleyFitness extends Fitness {
  constructor() {
    super();
    this.A = 20;
    this.B = -0.2;
  }

  apply(chromosome) {
    let result = 0;
    let sum = _.sum(chromosome.map((gene) => gene * gene));

    result =
      this.A - this.A * Math.exp(this.B * Math.sqrt(sum / chromosome.length));
    let cos = _.sum(chromosome.map((gene) => Math.cos(PI2 * gene)));

    result += Math.E - Math.exp(cos / chromosome.length);
    return result;
  }
}

/*
 L-trap function
 */

export class LTrapFitness extends Fitness {
  constructor(params = { l: 3, a: 1, b: 2 }) {
    super();
    this.l = params.l || 3;
    this.a = params.a || 1;
    this.b = params.b || 2;
    this.z = params.z || this.l - 1;
  }

  apply(stringChr) {
    var total = 0;
    for (let i = 0; i < stringChr.length; i += this.l) {
      let this_substr = stringChr.substr(i, this.l);
      let num_ones = 0;
      for (let j = 0; j < this_substr.length; j++) {
        num_ones += this_substr.substring(j, j + 1) === "1";
      }
      let this_result;
      if (num_ones <= this.z) {
        this_result = (this.a * (this.z - num_ones)) / this.z;
      } else {
        this_result = (this.b * (num_ones - this.z)) / (this.l - this.z);
      }
      total += this_result;
    }

    return total;
  }
}

/*
Masive Multimodal Deceptive Problem, a classic test function
*/
export class MMDPFitness extends Fitness {
  constructor() {
    super();
    this.unitation = [1, 0, 0.360384, 0.640576, 0.360384, 0, 1];
    this.block_size = 6;
  }

  apply(stringChr) {
    let total = 0;
    for (let i = 0; i < stringChr.length; i += this.block_size) {
      let this_substr = stringChr.substr(i, this.block_size);
      let num_ones = 0;
      for (let j = 0; j < this_substr.length; j++) {
        num_ones += this_substr.substring(j, j + 1) === "1";
      }
      total += this.unitation[num_ones];
    }

    return total;
  }
}

/*
  Rastrigin function https://tracer.lcc.uma.es/problems/rastrigin/rastrigin.html
*/
export class RastriginFitness extends Fitness {
  constructor() {
    super();
    this.A = 10.0;
  }

  apply(chromosome) {
    let total = _.sum(
      chromosome.map((value) => value * value - this.A * Math.cos(PI2 * value))
    );
    return total + this.A * chromosome.length;
  }
}
