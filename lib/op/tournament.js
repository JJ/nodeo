// Tournament Selection
/*jslint node: true */
"use strict";
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

import { Selection } from "../API/selection";

/*
Used to select from a group of chromosomes
@class Tournament
*/
export class Tournament extends Selection {
  constructor(tournament_size, pool_size) {
    this.tournament_size = tournament_size;
    this.pool_size = pool_size;
  }

  /**
  Selects a new population of size pool_size via comparing tournament_size chromosomes and taking the best
  @param { Object } population  a {Population} object, from which the pool will be selected
  @returns {Array}              an array with selected individuals
  */

  select(population) {
    let pool = [];
    const tournament_size = this.tournament_size;
    const pool_size = this.pool_size;
    if (tournament_size <= 1) {
      return new Error("Tournament size too small");
    }
    do {
      let best = population.one();
      for (let i = 1; i < tournament_size; i++) {
        let another = population.one();
        if (population.fitness_of[another] > population.fitness_of[best]) {
          best = another;
        }
      }
      pool.push(best);
    } while (pool.length < pool_size);
    return pool;
  }
}
