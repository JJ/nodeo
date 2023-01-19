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
    this.apply = _.memoize(this.apply);
  }

  apply(chromosome) {
    var result = 0;
    var sum = 0;

    for (var i in chromosome) {
      sum += chromosome[i] * chromosome[i];
    }
    result =
      this.A - this.A * Math.exp(this.B * Math.sqrt(sum / chromosome.length));
    var cos = 0;
    for (i in chromosome) {
      cos += Math.cos(PI2 * chromosome[i]);
    }
    result += Math.E - Math.exp(cos / chromosome.length); // needed for precision
    return result; // hack for returning 0
  }
}

/*
// L-trap function
functions.ltrap = function (x, l, a, b, z) {
  var total = 0;
  for (var i = 0; i < x.length; i += l) {
    var this_substr = x.substr(i, l);
    var num_ones = 0;
    for (var j = 0; j < this_substr.length; j++) {
      num_ones += this_substr.substring(j, j + 1) === "1";
    }
    var this_result;
    if (num_ones <= z) {
      this_result = (a * (z - num_ones)) / z;
    } else {
      this_result = (b * (num_ones - z)) / (l - z);
    }
    total += this_result;
    //	console.log("Total " + i + " :"+total + " num_ones " + num_ones );
  }

  return total;
};

//Masive Multimodal Deceptive Problem, a classic test function
functions.MMDP = function (x) {
  var block_size = 6;
  var unitation = [1, 0, 0.360384, 0.640576, 0.360384, 0, 1];
  var total = 0;
  for (var i = 0; i < x.length; i += block_size) {
    var this_substr = x.substr(i, block_size);
    var num_ones = 0;
    for (var j = 0; j < this_substr.length; j++) {
      num_ones += this_substr.substring(j, j + 1) === "1";
    }
    total += unitation[num_ones];
  }

  return total;
};

//Rastrigin function
functions.Rastrigin = function (x) {
  var total = 0;
  for (var i = 0; i < x.length; i++) {
    var value = x[i];
    total = total + value * value - 10.0 * Math.cos(2 * Math.PI * value);
  }
  return total + 10 * x.length;
};

*/
