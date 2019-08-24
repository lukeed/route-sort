function toValue(str) {
	if (str == '*') return 1e11; // wild
	if (/^\:(.*)\?/.test(str)) return 1111; // param optional
	if (/^\:(.*)\./.test(str)) return 11; // param w/ suffix
	if (/^\:/.test(str)) return 111; // param
	return 1; // static
}

function toRank(str) {
	var i=0, out='', arr=str.split('/');
	for (; i < arr.length; i++) out += toValue(arr[i]);
	return (i - 1)/+out;
}

export default function (arr, cache) {
	cache = {};
	return arr.sort(function (a, b) {
		return (cache[b] = cache[b] || toRank(b)) - (cache[a] = cache[a] || toRank(a));
	});
}
