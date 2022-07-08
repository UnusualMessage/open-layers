import {makeAutoObservable, runInAction} from "mobx";
import {fromLonLat} from "ol/proj";

import Parser from "../utils/Parser/Parser";
import FileService from "../services/FileService";
import matches from "../utils/matches";
import {enNameKey, pageSize, ruNameKey} from "../data/mapConfig";

class ObjectsStore {
	constructor() {
		this.service = new FileService();
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

	getCurrentFeaturesCount = (id, filter) => {
		return this.getFilteredFeatures(this.getFeaturesById(id, filter)?.featureCollection, filter)?.length;
	}

	getFeaturesByIndex = (index, filter) => {
		const group = this.groups[index];
		let copy = JSON.parse(JSON.stringify(group));

		copy.featureCollection = this.getFilteredFeatures(copy.featureCollection, filter);
		return copy;
	}

	getFeaturesById = (id, filter) => {
		if (this.groups.length === 0) {
			return undefined;
		}

		const group = this.groups?.find(group => group.id === id);
		let copy = JSON.parse(JSON.stringify(group));

		copy.featureCollection = this.getFilteredFeatures(copy.featureCollection, filter);
		return copy;
	}

	getPagedFeaturesById = (id, filter, page) => {
		if (this.groups.length === 0) {
			return undefined;
		}

		const group = this.groups?.find(group => group.id === id);
		let copy = JSON.parse(JSON.stringify(group));

		copy.featureCollection = this.getPagedFilteredFeatures(copy.featureCollection, filter, page);
		return copy;
	}

	getPagedFilteredFeatures = (featureCollection, filter, page) => {
		if (page === 0) {
			page = 1;
		}

		const features = this.getFilteredFeatures(featureCollection, filter);

		let start = (page - 1) * pageSize;

		if (start >= features.length) {
			return [];
		}

		let end = pageSize * page;

		if (start + pageSize > features.length) {
			end = start + pageSize - (pageSize + start - features.length);
		}

		if (features.length <= pageSize) {
			end = features.length;
		}

		const result = [];
		for (let i = start; i < end; ++i) {
			result.push(features[i]);
		}

		return result;
	}

	getFilteredFeatures = (featureCollection, filter) => {
		featureCollection = featureCollection?.filter(feature => {
			const keys = Object.keys(feature.properties);
			for (let key of keys) {
				if (key === ruNameKey || key === enNameKey) {
					return matches(filter, feature.properties[enNameKey], feature.properties[ruNameKey])
				}
			}

			return matches(filter, feature.properties.name)
		});

		return featureCollection;
	}

	readGroup = async (url, parsingStrategies, id) => {
		try {
			let file = await this.service.get(url);

			const parser = new Parser();
			for (let i = 0; i < parsingStrategies.length; ++i) {
				parser.setStrategy(parsingStrategies[i]);
				parser.setFile(file)
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