const fromCsvToJson = (file) => {
	const rows = file.split('\n');
	const headers = rows[0].split(';');
	headers[3] = "name";

	const result = [];

	for (let i = 1; i < rows.length; ++i) {
		const record = {};
		const columns = rows[i].split(';');

		for (let j = 0; j < headers.length; ++j) {
			record[headers[j]] = columns[j];
		}

		result.push(record);
	}

	return result;
}

export default fromCsvToJson;