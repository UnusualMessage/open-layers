const fromJsonToGeoJson = (json) => {
	const result = {
		type: "FeatureCollection",
		features: []
	}

	for (let i = 0; i < json.length; ++i) {
		const feature = {
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [

				]
			}
		}

		feature.geometry.coordinates.push(json[i].lon);
		feature.geometry.coordinates.push(json[i].lat);

		result.features.push(feature);
	}

	return result;
}

export default fromJsonToGeoJson;