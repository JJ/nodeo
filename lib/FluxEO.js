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
    this.evaluate( population, function( population ) {
	population.rank();
	var new_population = this.selection( population );
	done( population, new_population );
    });
};

