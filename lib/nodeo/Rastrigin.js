// Rastrigin function with Fitness function signature
 
//  * @license GPL v3
//  * @package nodeo
//  * @author Pablo Garcia <fergunet@gmail.com>

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var functions = require('./functions');

// making a function a class, MMDP style
function Rastrigin() {
    // Methods
    this.apply = apply;
}

// Applies trap function to chromosome using defaults
function apply( chromosome ){
//    console.log( "apply " + chromosome);
//    console.log( this);
    return functions.Rastrigin(chromosome);
    
}

exports.Rastrigin = Rastrigin;
