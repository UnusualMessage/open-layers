export default class Parser {
	file;
	strategy;

	constructor(file, strategy) {
		this.strategy = strategy;
		this.file = file;
	}

	parse = () => {
		return this.strategy(this.file);
	}

	setStrategy = (strategy) => {
		this.strategy = strategy;
	}

	setFile = (file) => {
		this.file = file;
	}
}