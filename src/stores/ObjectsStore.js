import {makeAutoObservable, runInAction} from "mobx";
import {fromLonLat} from "ol/proj";

import Parser from "../utils/Parser/Parser";
import FileService from "../services/FileService";
import matches from "../utils/matches";
import CurrentStateStore from "./CurrentStateStore";

class ObjectsStore {
	constructor() {
		this.service = FileService;
		this.objects = [];

		makeAutoObservable(this);
	}

	get = (filter) => {
		const result = []
		for (let i = 0; i < this.objects.length; ++i) {
			result.push(this.getObjectByIndex(i, filter));
		}

		return result;
	}

	getObjectByIndex = (index, filter) => {
		const object = this.objects[index].object;
		let copy = JSON.parse(JSON.stringify(object));

		return this.getFilteredObject(copy, filter);
	}

	getFilteredObject = (copy, filter) => {
		copy.features = copy.features.filter(feature => {
			const keys = Object.keys(feature.properties);
			for (let key of keys) {
				if (key === "name_ru" || key === "name_en") {
					return matches(filter, feature.properties.name_en, feature.properties.name_ru)
				}
			}

			return matches(filter, feature.properties.name)
		});
		return copy;
	}

	getObjectById = (id, filter) => {
		const object = this.objects.find(object => object.id === id).object;
		let copy = JSON.parse(JSON.stringify(object));

		return this.getFilteredObject(copy, filter);
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

			runInAction(() => {
				this.objects.push({
					id: id,
					object: object
				});
			})
		} catch(error) {
			console.log(error);
		}
	}
}

export default new ObjectsStore();