import {useEffect} from "react";
import {fromLonLat} from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format"
	;
import MapStore from "../../stores/MapStore";
import Parser from "../../utils/Parser/Parser";
import fromTextToJson from "../../utils/Parser/fromTextToJson";
import styleFunction from "../../utils/styleFunction";
import {observer} from "mobx-react-lite";
import {runInAction} from "mobx";

const GeoJsonLayer = () => {
	useEffect(() => {
		fetch('bars.geojson')
			.then((response) => {
				return response.text();
			})
			.then((result) => {
				const parser = new Parser(result, fromTextToJson);
				let objects = parser.parse();

				for (let i = 0; i < objects.features.length; ++i) {
					objects.features[i].geometry.coordinates = fromLonLat(
						objects.features[i].geometry.coordinates
					);
				}

				const vectorSource = new VectorSource({
					features: new GeoJSON().readFeatures(objects)
				});

				const vectorLayer = new VectorLayer({
					source: vectorSource,
					style: styleFunction
				});

				MapStore.getMap().addLayer(vectorLayer);
			})
	}, [])

	return(
		<>
		</>
	)
}

export default observer(GeoJsonLayer);