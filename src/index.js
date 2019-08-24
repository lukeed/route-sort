function toValue(str) {
	if (str == '*') return ''; // wild
	if (/^\:(.*)\?/.test(str)) return 2; // param optional
	if (/^\:(.*)\./.test(str)) return 3; // param w/ suffix
	if (/^\:/.test(str)) return 4; // param
	return 5; // static
}

function toRank(str) {
	var i=0, out='', arr=str.split('/');
	for (; i < arr.length; i++) out += toValue(arr[i]);
	return +out / i;
}

export default function (arr, cache) {
	cache = {};
	return arr.sort(function (a, b) {
		return (cache[b] = cache[b] || toRank(b)) - (cache[a] = cache[a] || toRank(a));
	});
}
