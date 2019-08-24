const test = require('tape');
const rsort = require('../dist/route-sort');

test('exports', t => {
	t.is(typeof rsort, 'function', 'exports a function');
	t.end();
});
