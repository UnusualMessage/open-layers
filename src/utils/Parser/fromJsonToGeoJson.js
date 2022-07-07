import {latKey, lonKey} from "../../data/mapConfig";

const fromJsonToGeoJson = (json) => {
	const result = {
		type: "FeatureCollection",
		features: []
	}

	for (let i = 0; i < json.length; ++i) {
		const feature = {
			type: "Feature",
			properties: {

			},

			geometry: {
				type: "Point",
				coordinates: [

				]
			}
		}

		for (let key of Object.keys(json[i])) {
			if (key === lonKey || key === latKey) {
				continue;
			}
			
			feature.properties[key] = json[i][key];
		}

		feature.geometry.coordinates.push(json[i][lonKey]);
		feature.geometry.coordinates.push(json[i][latKey]);

		result.features.push(feature);

	}

	return result;
}

export default fromJsonToGeoJson;