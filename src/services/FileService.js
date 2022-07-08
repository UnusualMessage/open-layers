class FileService {
	get = async (url) => {
		const response = await fetch(url);
		return response.text();
	}
}

export default FileService;