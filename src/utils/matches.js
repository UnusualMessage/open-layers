const matches = (filter, ...values) => {
	filter = filter?.toLowerCase().replace(/['"\s]+/g, '');

	let matches = false;
	for (let value of values) {
		value = value.toLowerCase().replace(/['"\s]+/g, '');
		if (value.indexOf(filter) !== -1) {
			matches = true;
			return matches;
		}
	}

	return matches;
}

export default matches;