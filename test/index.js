const test = require('tape');
const rsort = require('../dist/rsort');

test('exports', t => {
	t.is(typeof rsort, 'function', 'exports a function');
	t.end();
});
