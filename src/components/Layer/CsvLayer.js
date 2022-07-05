import {useEffect} from "react";
import {fromLonLat} from "ol/proj";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import VectorLayer from "ol/layer/Vector";

import MapStore from "../../stores/MapStore";
import styleFunction from "../../utils/styleFunction";
import Parser from "../../utils/Parser/Parser";
import fromCsvToJson from "../../utils/Parser/fromCsvToJson";
import fromJsonToGeoJson from "../../utils/Parser/fromJsonToGeoJson";
import {runInAction} from "mobx";

const CsvLayer = ({ visible }) => {
	useEffect(() => {
		fetch('portals.csv')
			.then((response) => {
				return response.text();
			})
			.then((result) => {
				const parser = new Parser(result, fromCsvToJson);
				let objects = parser.parse();

				parser.setStrategy(fromJsonToGeoJson);
				parser.setFile(objects);

				const geoJsonObjects = parser.parse();

				console.log(geoJsonObjects);

				for (let i = 0; i < geoJsonObjects.features.length; ++i) {
					geoJsonObjects.features[i].geometry.coordinates = fromLonLat(
						geoJsonObjects.features[i].geometry.coordinates
					);
				}

				const vectorSource = new VectorSource({
					features: new GeoJSON().readFeatures(geoJsonObjects)
				});

				const vectorLayer = new VectorLayer({
					source: vectorSource,
					style: styleFunction
				});

				runInAction(() => {
					MapStore.getMap().addLayer(vectorLayer);
					MapStore.setOnClick(vectorLayer);
				})
			})
	}, []);
	return(
		<>
		</>
	);
}

export default CsvLayer;