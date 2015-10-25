// Chromosome as a vector of float for Evolutionary Algorithms
'use strict';
// * @license GPL v3
// * @author Víctor Rivas Santos (vrivas@ujaen.es)
// *         from chromosome.js, authored by J.J Merelo.


// Creating namespace
var ChromosomeFloat={
    // Creates a single chromosome. Includes all utility functions
    Chromosome: function (vector,fitness,minvalue,maxvalue){

     if( minvalue>maxvalue) throw new RangeError ("Function ChromosomeFloat: Minvalue is bigger than maxvalue", "chromosome-float.js");
     this.vector = vector || [];
     this.fitness = fitness || 0;
     this.minvalue = minvalue || 0;
     this.maxvalue = maxvalue || 0;

    }


    // Flips the whole chromosome: maps [minvalue,maxvalue] into [maxvalue, minvalue]
    , invert: function (chrom) {
     return  new ChromosomeFloat.Chromosome(
         chrom.vector.map( function(e) {
         return (-e+chrom.minvalue+chrom.maxvalue);
     }));
    }

    // Changes the value at one point by some other randomly calculated
    , mutate: function (chrom) {
        chrom.vector[Math.floor(Math.random()*chrom.vector.length)]=chrom.minvalue+Math.random()*(chrom.maxvalue-chrom.minvalue);
        return  new ChromosomeFloat.Chromsome( chrom.vector );
    }

    // Interchanges a substring between the two parents
    , crossover: function ( chrom1, chrom2 ) {
        var length = chrom1.vector.length;
        var xover_point = Math.floor( Math.random() * length);
        var range = 1 + Math.floor(Math.random() * (length - xover_point) );
        var new_chrom1 = chrom1.vector.slice(0,xover_point)
                       .concat(chrom2.vector.slice(xover_point,xover_point+range))
                       .concat(chrom1.vector.slice(xover_point+range));
        var new_chrom2 = chrom2.vector.slice(0,xover_point)
                        .concat(chrom1.vector.slice(xover_point,xover_point+range))
                        .concat(chrom2.vector.slice(xover_point+range));
        return [new ChromosomeFloat.Chromosome(new_chrom1), new ChromosomeFloat.Chromosome(new_chrom2)];
    }

    // Applies operators to the pool
    , reproduction: function (  pool ) {
        var offspring = [];
        while (pool.length ) {
    	   var first = pool.splice( Math.floor(Math.random()*pool.length), 1 );
	       var second = pool.splice( Math.floor(Math.random()*pool.length), 1 );
	       var crossovers = ChromosomeFloat.crossover( first[0], second[0] );
	       for ( var i in crossovers ) {
	           offspring.push( ChromosomeFloat.mutate(crossovers[i]));
	       }
        }
        return offspring;
    }

} // namespace

module.exports = ChromosomeFloat;
