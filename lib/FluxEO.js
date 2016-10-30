// Evolutionary Algorithm, simplified, for node.js
/*jslint node: true */
'use strict';
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>


// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

module.exports = FluxEO;
FluxEO.Population = require("./nodeo/Population");
FluxEO.Selection = require("./nodeo/Selection");
FluxEO.ops = require('./nodeo/ops');

function FluxEO( fitness_function, selection, found_solution ) {
    this.fitness_function = fitness_function;
    this.selection = selection;
    this.found_solution = found_solution;
}

// Evaluate individuals if needed
FluxEO.prototype.evaluate = function( population, done ) {
    population.evaluate( this.fitness_function );
    done( population );
};

// Create a pool of new individuals
FluxEO.prototype.create_pool = function( population, done ) {
    var selection = this.selection;
    this.evaluate( population, function( population ) {
	population.rank();
	var new_population = selection.select( population );
	done( population, new_population );
    });
};


// Now reproduce them with each other
FluxEO.prototype.reproduce = function( population, done ) {
    this.create_pool( population, function( population, new_population ) {
	var mutants = FluxEO.ops.reproduction( new_population);
	done( population, mutants );
    });
};

// Incorporate using elitism
// var generation = 0;
FluxEO.prototype.generation = function( population ) {
//  console.log( "In " + generation ++ );
  this.reproduce( population, function( population, new_population ) {
    population.cull( new_population.length );
    population.insert( new_population );
  });
};


// Run the algorithm
FluxEO.prototype.algorithm = function( population, done ) {
  this.generation(population);
  if ( this.found_solution( population ) ) {
    console.log( "Found!!!");
    done( population );
  } else {
    process.nextTick( function () {
                         this.algorithm( population, done );
                       }.bind( this ));
  }
};
