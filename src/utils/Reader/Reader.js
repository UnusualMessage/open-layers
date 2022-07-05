export default class Reader {
	getFile = (path) => {
		fetch(path)
			.then((response) => {
				return response.text();
			}).then((result) => {
				return result
			})
	}
}
