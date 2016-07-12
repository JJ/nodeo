/**
 * Population class for NodEO
 * 
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

module.exports = Population;

function Population( individuals, fitness_hash) {
    this.living = individuals || new Array;
    this.fitness_of = fitness_hash || new Object;
};

// Sorts the population and returns it sorted
Population.prototype.rank = function() {
    return this.living.sort( function(a,b) {
	return fitness_of[b] - fitness_of[a];
    });
};

// Evaluates population
Population.prototype.evaluate = function( fitness ) {
    this.living.map( function( individual ) {
	if ( typeof this.fitness_of[individual] !== undefined ) {
	    this.fitness_of[individual] = fitness( individual );
	}
    });
};

// Initialize population
Population.prototype.initialize = function( size, create_individual ) {
    for ( var i = 0; i < size;  i ++ ) {
	this.living.push( create_individual() );
    }
};
	    
