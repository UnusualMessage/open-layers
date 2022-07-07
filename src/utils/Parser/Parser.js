export default class Parser {
	file;
	strategy;

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