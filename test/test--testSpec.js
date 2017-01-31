var test = require('tape');
var file = require('../server/config/test.js');

test('sum', function(t) { 
  t.plan(2);
  t.equal(3, file.sum(1, 2), 'returns the sum of both params');
  t.equal(7, file.sum(3, 4), 'returns the sum of both params');
});
