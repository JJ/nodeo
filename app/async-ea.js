#!/usr/bin/env node

var nodeo = require('../lib/nodeo.js'),
trap = nodeo.trap,
fs= require('fs');

var conf_file = process.argv[2] || 'nodeo.json';

var conf = JSON.parse(fs.readFileSync( conf_file, 'utf8' ));

// console.log(conf);
var log = [];

if ( !conf ) {
    throw "Problems with conf file";
}

log.push( conf );
var traps = conf.fitness.traps;
var chromosome_size = conf.fitness.l*traps;
var total_generations = 0;

var trapf = new trap.Trap( conf.fitness );

var eo = new nodeo.Nodeo( { population_size: conf.population_size,
			    chromosome_size: chromosome_size,
			    fitness_func: trapf } );

log.push( { start: process.hrtime() } );
console.log( "Starting ");
// start running the GA
var generation_count = 0;

// Start loop
generation();

// ---------------------------------

function generation() {
    generation_count++;
    eo.generation();
    if ( (eo.fitness_of[eo.population[0]] < traps*conf.fitness.b ) && (generation_count*conf.population_size < conf.max_evaluations )) {
	console.log( eo.population[0] );
	setImmediate(generation);
    } else {
	log.push( {end: { 
	    time: process.hrtime(),
	    generation: total_generations,
	    best : { chromosome : eo.population[0],
		     fitness : eo.fitness_of[eo.population[0]]}}} );
	conf.output = conf.output_preffix+".json";
	fs.writeFileSync(conf.output, JSON.stringify(log));
	console.log("Finished");
    }
}
