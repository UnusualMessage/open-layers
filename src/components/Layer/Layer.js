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
import CurrentStateStore from "../../stores/CurrentStateStore";
import {defaultVisibility} from "../../data/mapConfig";

const Layer = ({ sourceUrl, strategies, layerId }) => {
	useEffect(() => {
		runInAction(async () => {
			await ObjectsStore.readObjects(
				sourceUrl,
				strategies,
				layerId
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

			let visible = CurrentStateStore.getLayerStateById(layerId);

			if (visible === undefined || visible == null) {
				visible = defaultVisibility;
			}

			vectorLayer.setVisible(visible);
			CurrentStateStore.addLayerState(visible, layerId);

			MapStore.addLayer(vectorLayer, layerId);
			MapStore.setOnClick(vectorLayer);
		})
	}, [sourceUrl, strategies, layerId]);
	return(
		<>
		</>
	);
}

export default observer(Layer);