// Selection mechanisms plus common code if needed
/*jslint node: true */
'use strict';
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>


// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

module.exports = Selection;
Selection.Tournament = require("./Selection/Tournament");

// Dummy function
function Selection() {
    return;
}
