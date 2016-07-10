
// Trap function with Fitness function signature
//
// Trap is a deceptive function that is used, concatenated, to test
// evolutionary algorithms. 
// @license GPL v3
// @package nodeo
// @author J. J. Merelo <jjmerelo@gmail.com>

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */


// basic transform if and only iff
function t( a, b ) {
    if ( a == b ) {
	if(  a == '0' ) {
	    return '0';
	} else if (  a == '1' ) {
	    return '1';
	}
    } else {
	return '-';
    }
}

function T( ev ) {
    switch(ev) {
    case '-':
    case '1':
    case '0':
	return ev;
    case '00':
	return '0';
    case '11':
	return '1';
    case '01':
    case '10':
	return '-';
    default:
	if (ev.length == 2 && ev.match(/-/))
	    return '-'
	else 
	    return t(T(ev.slice(0,ev.length/2)),T(ev.slice(ev.length/2,ev.length)))
  }
}

function f( ev ) {
    if ( ev == '0' || ev == '1' )
	return 1;
    else
	return 0
}

// Class definition
// ```
// var this_HIFF = new HIFF.HIFF
// ```
//
function HIFF( ) {
    this.apply = apply;
}

// Applies trap function to chromosome using instance values
function apply( chromosome ){
    switch( chromosome ) {
    case '0':
    case '1':
	return 1;
    case '00':
    case '11':
	return 4;
    case '01':
    case '10':
	return 2;
    default:
	return chromosome.length*f(T(chromosome))
	    + apply( chromosome.slice(0,chromosome.length/2) )
	    + apply( chromosome.slice(chromosome.length/2,chromosome.length) )
    }
}

exports.HIFF = HIFF;
