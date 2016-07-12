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

function FluxEO( fitness_function ) {
    this.fitness_function = fitness_function;
}

// Evaluate individuals if needed
FluxEO.prototype.evaluate = function( population, done ) {
    population.evaluate( this.fitness_function );
    done( population );
};

