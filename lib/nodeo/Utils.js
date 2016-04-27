/**
 * Utility functions for NodEO
 * 
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var Utils = exports;

// Create a random chromosome
Utils.random= function (length){
    var chromosome = '';
    for ( var i = 0; i < length; i++ ){
	chromosome = chromosome + ((Math.random() >0.5)? "1": "0") ;
    }
    return chromosome;
};

// Computes maxOnes fitness
Utils.max_ones = function (chromosome){
    var ones = 0;
    for ( var i=0; i < chromosome.length; i++ ){ 
	ones += parseInt(chromosome.charAt(i));
    }
    return ones;
};

/**
* Sum of the floats contained in chromosome (being a vector of floats)
* @author Víctor Rivas <vrivas@ujaen.es>
* @date 26-Oct-2015
* @params chromosome [vector of floats] The chromosome whose members are going to be summed up.
* @return [float] The sum of the values contained in the vector
*/
Utils.sum_ones = function ( chromosome ) {
    return chromosome.reduce( function( prev, curr ) { return prev+curr; }, 0);
}
