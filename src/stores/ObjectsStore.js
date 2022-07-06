import {makeAutoObservable} from "mobx";
import Parser from "../utils/Parser/Parser";
import FileService from "../services/FileService";
import matches from "../utils/matches";

class ObjectsStore {
	constructor() {
		this.service = FileService;
		this.objects = [];
		this.filter = "";

		makeAutoObservable(this);
	}

	setFilter = (filter) => {
		this.filter = filter;
	}

	getObjects = () => {
		const features = this.objects[0].object.features;
		return features.filter(feature => matches(this.filter, feature.properties.name));
	}

	getObjectById = (id) => {
		return this.objects.find(object => object.id === id).object;
	}

	readObjects = async (url, parsingStrategies, id) => {
		try {
			let object = await this.service.get(url);
			for (let i = 0; i < parsingStrategies.length; ++i) {
				const parser = new Parser(object, parsingStrategies[i]);
				object = parser.parse();
			}

			this.objects.push({
				id: id,
				object: object
			});

		} catch(error) {
			console.log(error);
		}
	}
}

export default new ObjectsStore();