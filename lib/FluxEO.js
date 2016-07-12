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

function FluxEO( fitness_function, selection ) {
    this.fitness_function = fitness_function;
    this.selection = selection;
}

// Evaluate individuals if needed
FluxEO.prototype.evaluate = function( population, done ) {
    population.evaluate( this.fitness_function );
    done( population );
};

// Evaluate individuals if needed
FluxEO.prototype.reproduce = function( population, done ) {
    var that = this;
    this.evaluate( population, function( population ) {
	population.rank();
	var new_population = that.selection.select( population );
	done( population, new_population );
    });
};

// Incorporate using elitism
FluxEO.prototype.renew = function( population, done ) {
    var that = this;
    console.log( this );
    this.reproduce( population, function( population, new_population ) {
	population.cull( new_population.length );
	population.insert( new_population );
	done( population );
    });
};
