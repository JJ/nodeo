var test = require('tap').test,
    nodeo = require(__dirname + '/../../lib/index.js');

nodeo(function (err) {
    test('unit', function (t) {
        t.equal(err, null, 'error object is null');
        t.end();
    });
});