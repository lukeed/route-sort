# route-sort [![codecov](https://badgen.now.sh/codecov/c/github/lukeed/route-sort)](https://codecov.io/gh/lukeed/route-sort)

> A tiny (200B) utility to sort route patterns by [specificity](#specificity).

This module is available in three formats:

* **ES Module**: `dist/rsort.mjs`
* **CommonJS**: `dist/rsort.js`
* **UMD**: `dist/rsort.min.js`


## Install

```
$ npm install --save route-sort
```


## Usage

```js
import rsort from 'route-sort';

// We have multiple Author-based routes
// Note: These are currently an unsorted mess
const routes = ['/authors', '/authors/*', '/authors/:username/posts', '/authors/:username'];

const output = rsort(routes);

// Now, our routes are sorted correctly!
console.log(routes);
//=> [ '/authors', '/authors/:username', '/authors/:username/posts', '/authors/*' ]

// The original input was mutated, but it's also returned
console.log(routes === output);
//=> true
```


## API

### rsort(patterns)
Returns: `Array<String>`

Returns the same `patterns` you provide, sorted by [specificity](#specificity).

> **Important:** Your _original_ array is mutated!


#### patterns
Type: `Array<String>`

A list of [route pattern](#route-patterns) strings.


## Route Patterns

The supported route pattern types are:

* static – `/users`
* named parameters – `/users/:id`
* nested parameters – `/users/:id/books/:title`
* optional parameters – `/users/:id?/books/:title?`
* suffixed parameters – `/movies/:title.mp4`, `/movies/:title.(mp4|mov)`
* wildcards – `/users/*`


## Specificity

While this working definition may not apply _completely_ across the board, `route-sort` is meant to sort Express-like routing patterns in a safe manner, such that a serial traversal of the sorted array will always give you the most specific match.

You may use [`regexparam`](https://github.com/lukeed/regexparam) to convert the patterns into `RegExp` instances, and then use those to test an incoming URL against the patterns. We'll do that in the example below:

```js
import rsort from 'route-sort';
import toRegExp from 'regexparam';

// We have multiple Author-based routes
// Note: These are currently an unsorted mess
const routes = ['/authors', '/authors/*', '/authors/:username/posts', '/authors/:username'];

rsort(routes);
// Now, our routes are sorted correctly!
//=> [ '/authors', '/authors/:username', '/authors/:username/posts', '/authors/*' ]

// Let's make an inefficent DEMO function to:
// 1) loop thru the `routes` array
// 2) convert each pattern to a RegExp (repetitive)
// 3) test the RegExp to see if we had a match
function find(path) {
  for (let i=0; i < routes.length; i++) {
    let { pattern } = toRegExp(routes[i]);
    if (pattern.test(path)) return routes[i];
  }
  return false; // no match
}

find('/authors'); //=> "/authors"
find('/authors/lukeed'); //=> "/authors/:username"
find('/authors/foo/bar/baz'); //=> "/authors/*"
find('/authors/lukeed/posts'); //=> "/authors/:username/posts"
find('/hello/moto'); //=> false

// Sorting was important here, but otherwise our
// original `routes` list would have matched "/authors/*"
// against every path except `/hello/moto` and `/authors`.

// Cya!
```

## Related

* [regexparam](https://github.com/lukeed/regexparam) – convert route patterns to `RegExp` instances
* [route-manifest](https://github.com/lukeed/route-manifest) – runtime parser of the Route Manifest format
* [webpack-route-manifest](https://github.com/lukeed/webpack-route-manifest) – generate a Route Manifest file for your webpack build


## License

MIT © [Luke Edwards](https://lukeed.com)
