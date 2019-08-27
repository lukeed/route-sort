const test = require('tape');
const rsort = require('../dist/rsort');

test('exports', t => {
	t.is(typeof rsort, 'function', 'exports a function');
	t.end();
});


test('basics', t => {
	const input = ['*', '/', '/users'];
	const output = rsort(input);

	t.true(Array.isArray(output), 'returns an array');
	t.is(output.length, input.length, '~> equal length of input');
	t.same(output, input, '~> is the SAME array (sorted)');

	t.is(output.pop(), '*', 'wildcard is always last (if present)');

	t.end();
});


test('sorting :: root', t => {
	t.same(
		rsort([
			'/', '/:id',
			'/:id/foo', '/:id/bar',
			'/:id/foo/*', '/:id/foo/comments',
			'/:id/bar/:title?'
		]),
		[
			'/',
			'/:id',
			'/:id/foo', '/:id/bar',
			'/:id/foo/comments',
			'/:id/bar/:title?',
			'/:id/foo/*',
		]
	);

	t.end();
});


test('sorting :: base', t => {
	t.same(
		rsort([
			'/', '/users/:id',
			'/users/:id/foo', '/users/:id/bar',
			'/users/:id/foo/*', '/users/:id/foo/comments',
			'/users/:id/bar/:title?',
			'/users', '/users/hello'
		]),
		[
			'/',
			'/users',
			'/users/hello',
			'/users/:id',
			'/users/:id/foo',
			'/users/:id/bar',
			'/users/:id/foo/comments',
			'/users/:id/bar/:title?',
			'/users/:id/foo/*',
		]
	);

	t.end();
});


test('sorting :: mixed', t => {
	// TODO: investigate relevant Node 12.x change
	const is12 = process.version.startsWith('v12.');

	t.same(
		rsort([
			'/:slug', '/:slug/foobar',
			'/', '/users/:id', '*',
			'/users/:id/foo', '/users/:id/bar',
			'/:slug/foo/bar/:category?/items',
			'/users/:id/foo/*', '/users/:id/foo/comments',
			'/users/:id/bar/:title?',
			'/users', '/users/hello',
			'/movies/:title.mp4',
			'/movies/:actor',
			'/:slug/foo/*',
		]),
		is12 ? [
			'/',
			'/users',
			'/users/hello',
			'/movies/:title.mp4',
			'/:slug',
			'/:slug/foobar',
			'/users/:id',
			'/movies/:actor',
			'/users/:id/foo',
			'/users/:id/bar',
			'/users/:id/foo/comments',
			'/users/:id/bar/:title?',
			'/:slug/foo/bar/:category?/items',
			'/:slug/foo/*',
			'/users/:id/foo/*',
			'*'
		] : [
			'/users',
			'/',
			'/users/hello',
			'/movies/:title.mp4',
			'/:slug',
			'/:slug/foobar',
			'/movies/:actor',
			'/users/:id',
			'/users/:id/bar',
			'/users/:id/foo',
			'/users/:id/foo/comments',
			'/users/:id/bar/:title?',
			'/:slug/foo/bar/:category?/items',
			'/:slug/foo/*',
			'/users/:id/foo/*',
			'*'
		]
	);

	t.end();
});
