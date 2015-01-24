// Ackley function with Fitness function signature
 
//  * @license GPL v3
//  * @package nodeo
//  * @author J. J. Merelo <jjmerelo@gmail.com>

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var functions = require('./functions');

// making a function a class, MMDP style
function Ackley() {
    // Methods
    this.apply = apply;
}

// Applies trap function to chromosome using defaults
function apply( chromosome ){
//    console.log( "apply " + chromosome);
//    console.log( this);
    return functions.ackley(chromosome);
    
}

exports.Ackley = Ackley;
