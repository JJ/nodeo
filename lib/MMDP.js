/**
 * MMDP function with Fitness function signature
 * 
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var functions = require('./functions');
var mmdp = exports;

function MMDP() {
    // Methods
    this.apply = apply;
}

// Applies trap function to chromosome using defaults
function apply( chromosome ){
//    console.log( "apply " + chromosome);
//    console.log( this);
    return functions.MMDP(chromosome);
    
}

mmdp.MMDP = MMDP;