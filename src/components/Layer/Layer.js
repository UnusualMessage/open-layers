import {useEffect} from "react";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import {fromLonLat} from "ol/proj";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import VectorLayer from "ol/layer/Vector";

import ObjectsStore from "../../stores/ObjectsStore";
import styleFunction from "../../utils/styleFunction";
import MapStore from "../../stores/MapStore";

const Layer = ({ sourceUrl, strategies, layerId }) => {
	useEffect(() => {
		runInAction(async () => {
			await ObjectsStore.readFile(
				sourceUrl,
				strategies
			);

			const geoJsonObjects = ObjectsStore.getCurrent();

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

			MapStore.addLayer(vectorLayer, layerId);
			MapStore.setOnClick(vectorLayer);
		})
	}, [sourceUrl, strategies]);
	return(
		<>
		</>
	);
}

export default observer(Layer);