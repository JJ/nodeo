// Selection mechanisms plus common code if needed
/*jslint node: true */
'use strict';
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>


// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

module.exports = Tournament;

// Encapsulates parameters
function Tournament (  tournament_size, pool_size ) {
    /*jshint validthis: true */
    this.tournament_size = tournament_size;
    this.pool_size = pool_size;
}

// Selects a new population of size pool_size via comparing tournament_size chromosomes and taking the best
Tournament.prototype.select = function ( population ) {
/*jshint validthis: true */
    var pool = [];
    var tournament_size = this.tournament_size;
    var pool_size = this.pool_size;
    if ( tournament_size <= 1 ) {
	return new Error ("Tournament size too small");
    }
    do {
	var best =  population.one() ;
	for ( var i = 1; i < tournament_size; i ++) {
	    var another= population.one();
	    if ( population.fitness_of(another)
		 > population.fitness_of(best)) {
		best = another;
	    }
	}
	pool.push( best );
    } while (pool.length < pool_size );
    return pool;
}



