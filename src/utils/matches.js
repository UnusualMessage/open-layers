const matches = (filter, real) => {
	if (filter.length > real.length) {
		return false;
	}

	filter = filter.toLowerCase();
	real = real.toLowerCase();

	real.replace(/['"]+/g, '');

	for (let i = 0; i < filter.length; ++i) {
		if (filter[i] !== real[i]) {
			return false;
		}
	}

	return true;
}

export default matches;