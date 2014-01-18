/**
 * Trap function with Fitness function signature
 * 
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var functions = require('./functions');
var trap = exports;

function Trap( options ) {
    for ( var i in options ) {
	this[i] = options[i];
    }
    if ( !this.l ) {
	this.l = 3;
    }
    if ( !this.a ) {
	this.a = 1;
    }
    if ( !this.b ) {
	this.l = 2;
    }
    if ( !this.z ) {
	this.a = this.l-1;
    }

    // Methods
    this.apply = apply;
}

// Applies trap function to chromosome using defaults
function apply( chromosome ){
    return functions.ltrap(chromosome, this.l, this.a, this.b, this.z);
    
}

trap.Trap = Trap;