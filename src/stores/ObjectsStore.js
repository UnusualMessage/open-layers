import {makeAutoObservable, runInAction} from "mobx";
import Parser from "../utils/Parser/Parser";
import FileService from "../services/FileService";

class ObjectsStore {
	constructor() {
		makeAutoObservable(this);

		this.service = FileService;
		this.objects = [];
		this.current = {};
	}

	getCurrent = () => {
		return this.current
	}

	readFile = async (url, parsingStrategies) => {
		try {
			const file = await this.service.get(url);

			runInAction(() => {
				let object = file;
				for (let i = 0; i < parsingStrategies.length; ++i) {
					const parser = new Parser(object, parsingStrategies[i]);
					object = parser.parse();
				}

				this.objects.push(object);
				this.current = object;
			});

		} catch(error) {
			console.log(error);
		}
	}
}

export default new ObjectsStore();