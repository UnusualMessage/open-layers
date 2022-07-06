import {makeAutoObservable} from "mobx";

import Parser from "../utils/Parser/Parser";
import FileService from "../services/FileService";
import matches from "../utils/matches";
import CurrentStateStore from "./CurrentStateStore";
import {fromLonLat} from "ol/proj";

class ObjectsStore {
	constructor() {
		this.service = FileService;
		this.objects = [];

		makeAutoObservable(this);
	}

	getObjectByIndex = (index, filter) => {
		const object = this.objects[index].object;
		let copy = JSON.parse(JSON.stringify(object));

		copy.features = copy.features.filter(feature => {
			return matches(filter, feature.properties.name)
		});
		return copy;
	}

	getObjectById = (id) => {
		const object = this.objects.find(object => object.id === id).object;
		let copy = JSON.parse(JSON.stringify(object));

		copy.features = copy.features.filter(feature => matches(CurrentStateStore.filter, feature.properties.name));
		return copy;
	}

	readObjects = async (url, parsingStrategies, id) => {
		try {
			let object = await this.service.get(url);
			for (let i = 0; i < parsingStrategies.length; ++i) {
				const parser = new Parser(object, parsingStrategies[i]);
				object = parser.parse();
			}

			for (let i = 0; i < object.features.length; ++i) {
				object.features[i].geometry.coordinates = fromLonLat(
					object.features[i].geometry.coordinates
				);
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