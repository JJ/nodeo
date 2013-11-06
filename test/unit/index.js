var test = require('tap').test,
    nodeo = require(__dirname + '/../../lib/nodeo.js');


test('Loads OK', function (t) {
         t.ok(nodeo, 'Loaded OK');
         t.end();
     });
