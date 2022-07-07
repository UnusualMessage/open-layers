import {makeAutoObservable, runInAction} from "mobx";
import {fromLonLat} from "ol/proj";

import Parser from "../utils/Parser/Parser";
import FileService from "../services/FileService";
import matches from "../utils/matches";

class ObjectsStore {
	constructor() {
		this.service = FileService;
		this.groups = [];

		makeAutoObservable(this);
	}

	get = (filter) => {
		const result = []
		for (let i = 0; i < this.groups.length; ++i) {
			result.push(this.getFeaturesByIndex(i, filter));
		}

		return result;
	}

	getFeaturesByIndex = (index, filter) => {
		const group = this.groups[index];
		let copy = JSON.parse(JSON.stringify(group));

		copy.featureCollection = this.getFilteredFeatures(copy.featureCollection, filter);
		return copy;
	}

	getFeaturesById = (id, filter) => {
		const group = this.groups.find(group => group.id === id);
		let copy = JSON.parse(JSON.stringify(group));

		copy.featureCollection = this.getFilteredFeatures(copy.featureCollection, filter);
		return copy;
	}

	getFilteredFeatures = (featureCollection, filter) => {
		featureCollection = featureCollection.filter(feature => {
			const keys = Object.keys(feature.properties);
			for (let key of keys) {
				if (key === "name_ru" || key === "name_en") {
					return matches(filter, feature.properties.name_en, feature.properties.name_ru)
				}
			}

			return matches(filter, feature.properties.name)
		});

		return featureCollection;
	}

	readGroup = async (url, parsingStrategies, id) => {
		try {
			let file = await this.service.get(url);
			for (let i = 0; i < parsingStrategies.length; ++i) {
				const parser = new Parser(file, parsingStrategies[i]);
				file = parser.parse();
			}

			for (let i = 0; i < file.features.length; ++i) {
				file.features[i].geometry.coordinates = fromLonLat(
					file.features[i].geometry.coordinates
				);
			}

			runInAction(() => {
				this.groups.push({
					id: id,
					featureCollection: file.features
				});
			})
		} catch(error) {
			console.log(error);
		}
	}
}

export default new ObjectsStore();