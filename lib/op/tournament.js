// Tournament Selection
/*jslint node: true */
"use strict";
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

import { Selection } from "../api/selection";

/*
Used to select from a group of chromosomes
@class Tournament
*/
export class Tournament extends Selection {
  #tournament_size;
  #pool_size;

  constructor(tournament_size, pool_size) {
    super();
    if (tournament_size <= 1) {
      throw new Error("Tournament size too small");
    }
    if (pool_size < tournament_size) {
      throw new Error("Pool size too small");
    }
    this.#tournament_size = tournament_size;
    this.#pool_size = pool_size;
  }

  /**
  Selects a new population of size pool_size via comparing tournament_size chromosomes and taking the best
  @param { Array } population  an array of {Chromosome} objects, from which the pool will be selected
  @returns {Array}              an array with selected individuals
  */

  select(population) {
    let pool = [];
    const tournament_size = this.#tournament_size;
    const pool_size = this.#pool_size;

    do {
      let best = population[Math.floor(Math.random() * population.length)];
      for (let i = 1; i < tournament_size; i++) {
        let another = population[Math.floor(Math.random() * population.length)];
        if (another.fitness > best.fitness) {
          best = another;
        }
      }
      pool.push(best);
    } while (pool.length < pool_size);
    return pool;
  }
}
