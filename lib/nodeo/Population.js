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
    var this_fitness_of = this.fitness_of;
    return this.living.sort( function(a,b) {
	return this_fitness_of[b] - this_fitness_of[a];
    });
};

// Evaluates population
Population.prototype.evaluate = function( fitness ) {
    console.log( "evaluate ");
    console.log( this );
    var this_fitness_of =  this.fitness_of;
    this.living.map( function( individual ) {
	if ( ! (individual in this_fitness_of ) ) {
	    this_fitness_of[individual] = fitness( individual );
	}
    });
};

// Initialize population
Population.prototype.initialize = function( size, create_individual ) {
    for ( var i = 0; i < size;  i ++ ) {
	this.living.push( create_individual() );
    }
};
	    
// Return population
Population.prototype.chromosomes = function() {
    return this.living;
};

// Returns the cached fitness of a particular individual 
Population.prototype.fitness_of = function( individual ) {
    return this.fitness_of[ individual ];
}
			    
