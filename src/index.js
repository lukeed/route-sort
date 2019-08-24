function toValue(str) {
	if (str === '*') return ''; // wild
	if (/^[:](.*)\?/.test(str)) return 2; // param optional
	if (/^[:](.*)\./.test(str)) return 3; // param w/ suffix
	if (/^[:]/.test(str)) return 4; // param
	return 5; // static
}

function toRank(str, idx) {
	var i=0, out='', arr = str.split('/');
	for (; i < arr.length; i++) out += toValue(arr[i]);
	return { uri: str, index: idx, rank: (+out / arr.length) };
}

export default function (arr) {
	return arr.map(toRank).sort(function (a, b) {
		return b.rank - a.rank || (b.index - a.index);
	});
}
